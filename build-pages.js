#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function parseFrontMatter(content) {
    const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontMatterRegex);

    if (!match) {
        console.error('No front matter found');
        return null;
    }

    const frontMatter = {};
    const lines = match[1].split('\n');
    let currentKey = null;
    let currentValue = '';
    let currentList = [];
    let inList = false;
    let inMultiLine = false;

    lines.forEach(line => {
        const trimmedLine = line.trim();
        const isIndented = line.startsWith('  ') || line.startsWith('\t');
        const hasColon = line.includes(':') && !isIndented;

        // Handle multi-line continuation (indented lines that aren't list items)
        if (isIndented && !trimmedLine.startsWith('-') && inMultiLine && currentKey) {
            currentValue += ' ' + trimmedLine;
            return;
        }

        // Save previous multi-line value
        if (inMultiLine && currentKey && currentValue) {
            frontMatter[currentKey] = currentValue.replace(/^["']|["']$/g, '');
            currentKey = null;
            currentValue = '';
            inMultiLine = false;
        }

        // Check if starting a new key
        if (hasColon && !trimmedLine.startsWith('-')) {
            // Save any pending list
            if (inList && currentKey) {
                frontMatter[currentKey] = currentList;
                currentList = [];
                inList = false;
            }

            const colonIndex = line.indexOf(':');
            currentKey = line.substring(0, colonIndex).trim();
            let value = line.substring(colonIndex + 1).trim();

            if (value === '') {
                // Could be a list or empty value
                inList = true;
            } else {
                // Check if value might continue on next line
                inMultiLine = true;
                currentValue = value;
            }
        } else if (trimmedLine.startsWith('-') && inList) {
            // Parse list items (skills)
            const listMatch = trimmedLine.match(/- skill: ["']?(.+?)["']?$/);
            if (listMatch) {
                currentList.push(listMatch[1]);
            }
        }
    });

    // Handle final multi-line value
    if (inMultiLine && currentKey && currentValue) {
        frontMatter[currentKey] = currentValue.replace(/^["']|["']$/g, '');
    }

    // Handle final list
    if (inList && currentKey) {
        frontMatter[currentKey] = currentList;
    }

    return { data: frontMatter, content: match[2].trim() };
}

function buildPages() {
    const contentDir = path.join(__dirname, 'content');
    const outputFile = path.join(__dirname, 'pages-data.json');

    console.log('🔨 Building pages from markdown files...');

    if (!fs.existsSync(contentDir)) {
        console.log('⚠️ No content directory found');
        fs.writeFileSync(outputFile, JSON.stringify({}, null, 2));
        return;
    }

    const pagesData = {};

    // Read about page
    const aboutPath = path.join(contentDir, 'about.md');
    if (fs.existsSync(aboutPath)) {
        const content = fs.readFileSync(aboutPath, 'utf-8');
        const parsed = parseFrontMatter(content);

        if (parsed) {
            pagesData.aboutPage = {
                name: parsed.data.name || 'Your Name',
                title: parsed.data.title || 'Architectural Engineer',
                content: (parsed.data.about_text_1 || '') + '\n\n' + (parsed.data.about_text_2 || ''),
                skills: parsed.data.skills || [],
                profile_image: parsed.data.profile_image || ''
            };
            console.log('✅ About page loaded:', pagesData.aboutPage.name);
        }
    } else {
        console.log('⚠️ about.md not found');
    }

    // Read contact info
    const contactPath = path.join(contentDir, 'contact.md');
    if (fs.existsSync(contactPath)) {
        const content = fs.readFileSync(contactPath, 'utf-8');
        const parsed = parseFrontMatter(content);

        if (parsed) {
            pagesData.contact = {
                email: parsed.data.email || '',
                phone: parsed.data.phone || '',
                linkedin: parsed.data.linkedin || '',
                other_label: parsed.data.other_label || '',
                other_url: parsed.data.other_url || ''
            };
            console.log('✅ Contact info loaded');
        }
    }

    // Read site settings
    const settingsPath = path.join(contentDir, 'settings.md');
    if (fs.existsSync(settingsPath)) {
        const content = fs.readFileSync(settingsPath, 'utf-8');
        const parsed = parseFrontMatter(content);

        if (parsed) {
            pagesData.settings = {
                site_title: parsed.data.site_title || 'Architecture Portfolio',
                hero_title: parsed.data.hero_title || 'Architectural Engineering',
                hero_subtitle: parsed.data.hero_subtitle || '',
                copyright: parsed.data.copyright || 'All rights reserved.'
            };
            console.log('✅ Site settings loaded');
        }
    }

    fs.writeFileSync(outputFile, JSON.stringify(pagesData, null, 2));
    console.log('✅ Successfully built pages data');
}

try {
    buildPages();
    process.exit(0);
} catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
}
