# How to Update Website Content

This guide explains how to update text on the LUCID website using Google Sheets.

## Overview

  

The website text is managed via a Google Sheet Document. When you make changes and click on `Sync Updates to Website`, the updates are automatically sent to the website.

  

**What you'll need:**

- Access to the LUCID commons Google Sheet.

---

## Step 1: Open the Google Sheet


Open the LUCID commons spreadsheet. You should see tabs at the bottom for each language:


| Tab | Language |
|-----|----------|
| `en` | English |
| `de` | German |
| `fr` | French |
| `it` | Italian |



---

  

## Step 2: Find the Text You Want to Change

  

Each tab has three columns:

  

| Column | What it means |
|--------|---------------|
| **section** | Which part of the website (e.g., `hero`, `contact`, `impact`) |
| **key** | The specific text item (e.g., `landing-title`, `email-label`) |
| **value** | The actual text that appears on the website |

  

**Example:**

 

| section | key | value |
|---------|-----|-------|
| hero | landing-title | `<br> <b>Swiss University Hospitals</b> `|
| hero | landing-description | Identify and understand low-value care |
| contact | email-label | Email Address |


To change "Quality of Care in Switzerland" to something else, edit the **value** cell in that row.

---

  

## Step 3: Make Your Changes

  

1. Click on the **value** cell you want to edit

2. Type your new text

3. Press **Enter** to confirm

  

**Important:**

- ✅ Only edit the **value** column (Column C)

- ❌ Don't change the **section** or **key** columns — these must stay exactly as they are
-  ⚠️ ` <br> `and `<b>...</b> ` are html code elements indicating a line break and bold text. It's better not to edit these

- ✅ Make sure to update **all language tabs** if you're changing something that needs translation

  

---

  

## Step 4: Send Your Changes to the Website

  

Once you've finished editing:

  

1. Look for the menu **⚡ Trigger Updates** in the menu bar (next to File, Edit, View...)

2. Click **⚡ Trigger Updates**

3. Click **Sync Translations to Website**

  

![Menu location: ⚡ Trigger Updates → Sync Translations to Website]

  

A message will appear confirming the sync was triggered.

  

---

  

## Step 5: Approve the Changes

  

After triggering the sync, a **Pull Request** (PR) is automatically created. This is like a "change request" that needs approval before going live.
  

*As you don't have access to approve PRs, ask someone on the development team to do this step.* For now you can reach out to Hannah, when you want to push the final updates. 

 
  

## Troubleshooting

  

### "⚡ Trigger Updates" menu doesn't appear

- Refresh the page (press F5 or Cmd+R)

- Wait a few seconds after opening the sheet — the menu loads after the page fully opens

  

### Error message when clicking sync

- Make sure you're logged in with a Google account that has access to the sheet

- Contact Hannah if errors persist

  

### Changes don't appear on website

- Check if the Pull Request was created (GitHub → Pull Requests tab)

- Check if the Pull Request was merged (approved)

- Wait a few more minutes — sometimes it takes time to deploy

  

### I changed the wrong thing!

- Just change it back in the spreadsheet

- Trigger another sync

- The new PR will overwrite the previous changes

  

---

  

## Quick Reference: Section Names

  

| Section name | Where it appears on the website |
|--------------|--------------------------------|
| `hero` | Main banner at the top of the homepage |
| `lvc` | "What is Low-Value Care" section |
| `impact` | Statistics and map section |
| `datastream` | Data/carousel section |
| `main-goals` | Goals section |
| `contact` | Contact form at the bottom |
| `sections` | Navigation menu items |
| `language` | Language switcher labels |

  

---

  

## Need Help?

  

Contact the development team if you:

- Need to add completely new text (not just edit existing)

- Accidentally broke something

- Have questions about what can/cannot be changed

  

---

  

*Last updated: January 2026*