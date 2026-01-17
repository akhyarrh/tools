document.addEventListener('DOMContentLoaded', () => {
    const titleInput = document.getElementById('titleInput');
    const imagePathInput = document.getElementById('imagePathInput');
    const imageAltInput = document.getElementById('imageAltInput');
    const filenameOutput = document.getElementById('filenameOutput');
    const editor = document.getElementById('editor');
    const downloadBtn = document.getElementById('downloadBtn');
    const copyBtn = document.getElementById('copyBtn');

    let currentFilename = "";

    function generateFrontMatter() {
        const title = titleInput.value || "Judul Postingan";
        const imagePath = imagePathInput.value || "";
        const imageAlt = imageAltInput.value || "";
        
        const now = new Date();
        const dateISO = now.toISOString().split('T')[0];
        const timeString = now.toTimeString().split(' ')[0];
        const timezone = now.toTimeString().split(' ')[1].replace('GMT', '');
        const fullDate = `${dateISO} ${timeString} ${timezone}`;

        // Slug for filename
        const slug = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
        currentFilename = `${dateISO}-${slug}.md`;
        filenameOutput.textContent = currentFilename;

        return `---
layout: post
title: "${title}"
date: ${fullDate}
image:
  path: ${imagePath}
  alt: "${imageAlt}"
categories: []
tags: []
---`;
    }

    function updateEditor() {
        const frontMatter = generateFrontMatter();
        const currentContent = editor.value;

        if (!currentContent.includes('---') || currentContent.trim().startsWith('---')) {
            const body = currentContent.split('---').slice(2).join('---').trim();
            editor.value = frontMatter + "\n\n" + (body || "Write post content here...");
        }
    }

    // Download
    downloadBtn.addEventListener('click', () => {
        const content = editor.value;
        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = currentFilename || '2025-12-31-post-title.md';
        document.body.appendChild(a);
        a.click();
        
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    // Copy
    copyBtn.addEventListener('click', () => {
        editor.select();
        document.execCommand('copy');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = "Copied!";
        setTimeout(() => copyBtn.textContent = originalText, 2000);
    });

    // Event Listeners for input
    [titleInput, imagePathInput, imageAltInput].forEach(input => {
        input.addEventListener('input', updateEditor);
    });

    // Init
    updateEditor();
});