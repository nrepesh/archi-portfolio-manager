#!/usr/bin/env node

/**
 * Build script: Converts markdown files from /content/projects/ to JSON
 * This runs during Netlify build
 */

const fs = require('fs');
const path = require('path');

// Parse front matter from markdown
function parseFrontMatter(content) {
    const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontMatterRegex);
    
    if (!match) {
        console.error('No front matter found');
        return null;
    }
    
    const frontMatter = {};
    const frontMatterLines = match[1].split('\n');
    
    frontMatterLines.forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
            const key = line.substring(0, colonIndex).trim();
            let value = line.substring(colonIndex + 1).trim();
            
            // Remove quotes
            value = value.replace(/^["']|["']$/g, '');
            
            frontMatter[key] = value;
        }
    });
    
    return {
        data: frontMatter,
        content: match[2].trim()
    };
}

// Read all project markdown files
function buildProjects() {
    const projectsDir = path.join(__dirname, 'content', 'projects');
    const outputFile = path.join(__dirname, 'projects-data.json');
    
    console.log('🔨 Building projects from markdown files...');
    
    // Check if directory exists
    if (!fs.existsSync(projectsDir)) {
        console.log('⚠️  No projects directory found, creating empty projects array');
        fs.writeFileSync(outputFile, JSON.stringify([], null, 2));
        return;
    }
    
    // Read all markdown files
    const files = fs.readdirSync(projectsDir).filter(file => file.endsWith('.md'));
    
    if (files.length === 0) {
        console.log('⚠️  No project files found, creating empty projects array');
        fs.writeFileSync(outputFile, JSON.stringify([], null, 2));
        return;
    }
    
    const projects = [];
    
    files.forEach(file => {
        const filePath = path.join(projectsDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const parsed = parseFrontMatter(content);
        
        if (parsed) {
            projects.push({
                title: parsed.data.title || 'Untitled Project',
                category: parsed.data.category || 'Other',
                year: parsed.data.year || new Date().getFullYear().toString(),
                image: parsed.data.image || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
                description: parsed.data.description || '',
                date: parsed.data.date || new Date().toISOString(),
                featured: parsed.data.featured === 'true' || parsed.data.featured === true
            });
        }
    });
    
    // Sort by date (newest first)
    projects.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Write to JSON file
    fs.writeFileSync(outputFile, JSON.stringify(projects, null, 2));
    
    console.log(`✅ Successfully built ${projects.length} projects`);
    projects.forEach(p => console.log(`   - ${p.title} (${p.year})`));
}

// Run the build
try {
    buildProjects();
    process.exit(0);
} catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
}
