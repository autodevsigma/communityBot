> ## [Ελληνικά](#ελληνικά)

> ## [English](#english)



---


## Ελληνικά
# CommunityBot

[![Discord](https://img.shields.io/badge/Discord-Join-blue.svg)](https://theauto.dev/discord)
[![GitHub](https://img.shields.io/github/stars/autodevsigma/communityBot.svg?style=social)](https://github.com/autodevsigma/communityBot)

Το CommunityBot είναι ένα ανοιχτού κώδικα Discord bot που δημιουργήθηκε από τον [autodevsigma](https://github.com/autodevsigma) για την κοινότητα CodeGRow. Στόχος του είναι να βοηθήσει αρχάριους να ξεκινήσουν με το [discord.js](https://discord.js.org/) παρέχοντας ένα καθαρό, αρθρωτό πρότυπο με χρήσιμες λειτουργίες και εύκολη επεκτασιμότητα.

---

## Περιεχόμενα

- [Λειτουργίες](#λειτουργίες)
- [Ξεκινώντας](#ξεκινώντας)
- [Ρυθμίσεις](#ρυθμίσεις)
- [Κεντρική Αρχιτεκτονική](#κεντρική-αρχιτεκτονική)
  - [Βάση Δεδομένων](#βάση-δεδομένων)
  - [Slash Εντολές](#slash-εντολές)
  - [Γεγονότα](#γεγονότα)
  - [Χειριστές Κουμπιών](#χειριστές-κουμπιών)
  - [Χειριστές Επιλογών](#χειριστές-επιλογών)
  - [Χειριστές Modal](#χειριστές-modal)
- [Λεπτομέρειες Λειτουργιών](#λεπτομέρειες-λειτουργιών)
  - [Σύστημα Προτάσεων](#σύστημα-προτάσεων)
  - [Moderation](#moderation)
  - [Μετάφραση](#μετάφραση)
  - [Εικόνες Καλωσορίσματος](#εικόνες-καλωσορίσματος)
- [Συνεισφορά](#συνεισφορά)
- [Υποστήριξη](#υποστήριξη)
- [Άδεια](#άδεια)

---

## Λειτουργίες

- **Προσαρμοσμένη Βάση Δεδομένων**: Βασισμένη σε MongoDB, παρόμοια με QuickDB, για αποθήκευση δεδομένων guild/user.
- **Slash Εντολές**: Αρθρωτές, φορτώνονται αυτόματα από φακέλους.
- **Moderation**: Αποκλεισμός χρηστών, mod logs, ρυθμιζόμενα χρώματα embed.
- **Σύστημα Προτάσεων**: Διαδραστικά μενού επιλογών, modals, κουμπιά ψήφου, threads για συζήτηση.
- **Μετάφραση**: Μετάφραση οποιουδήποτε κειμένου σε οποιαδήποτε γλώσσα μέσω Google Translate.
- **Εικόνες Καλωσορίσματος**: Προσαρμοσμένα banners για νέα μέλη.
- **Επεκτάσιμοι Χειριστές**: Εύκολη προσθήκη κουμπιών, modals, μενού επιλογών και γεγονότων.

---

## Ξεκινώντας

### 1. Κλωνοποίηση του Αποθετηρίου

```sh
git clone https://github.com/autodevsigma/communityBot.git
cd communityBot
```

### 2. Εγκατάσταση Εξαρτήσεων

```sh
npm install
```

### 3. Ρύθμιση του Bot

Αντιγράψτε το `src/config.js.example` στο `src/config.js` και συμπληρώστε το token του bot, το MongoDB URL και άλλες ρυθμίσεις:

```js
module.exports = {
  token: "YOUR_BOT_TOKEN",
  betatoken: "YOUR_BETA_TOKEN",
  id: "YOUR_BOT_ID",
  betaID: "YOUR_BETA_ID",
  ownerID: "YOUR_USER_ID",
  mongourl: "YOUR_MONGODB_URL",
  embedColor: 0x00ffff,
  status: "GLOBAL", // ή "BETA"
}
```

### 4. Εκκίνηση του Bot

```sh
npm start
```

---

## Ρυθμίσεις

- Όλες οι ρυθμίσεις γίνονται στο `src/config.js`.
- Μπορείτε να ορίσετε το token του bot, το MongoDB URL, το χρώμα embed και την κατάσταση (GLOBAL/BETA).
- Το bot υποστηρίζει τόσο κύριο όσο και beta token για δοκιμές.

---

## Κεντρική Αρχιτεκτονική

### Βάση Δεδομένων

- Βρίσκεται στο `src/utils/Database.js`.
- Χρησιμοποιεί MongoDB μέσω Mongoose.
- API:
  ```js
  client.db.set(key, value)
  client.db.get(key)
  client.db.add(key, value)
  client.db.delete(key)
  client.db.push(key, value)
  client.db.pull(key, value)
  client.db.has(key)
  ```
- Χρησιμοποιείται για αποθήκευση ρυθμίσεων, ψήφων προτάσεων, καναλιών mod log κ.ά.

### Slash Εντολές

- Βρίσκονται στο `src/slashCommands/`.
- Φορτώνονται αυτόματα από τον handler στο `src/handlers/handle.js`.
- Παράδειγμα:
  ```js
  const { SlashCommandBuilder } = require("discord.js");
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("ping")
      .setDescription("Pong!"),
    async execute(interaction, client) {
      interaction.reply({ content: "Pong 🏓", ephemeral: true });
    }
  }
  ```

### Γεγονότα

- Βρίσκονται στα `src/events/Client/` και `src/events/Guild/`.
- Φορτώνονται αυτόματα από τον handler.
- Παραδείγματα: `ready.js`, `interactionCreate.js`, `guildMemberAdd.js`.

### Χειριστές Κουμπιών

- Βρίσκονται στο `src/utils/buttons/`.
- Φορτώνονται αυτόματα από τον handler.
- Παράδειγμα: `suggestionUpvote.js`, `suggestionDownvote.js`.
- Κάθε αρχείο κουμπιού εξάγει:
  - `customId`: Μοναδικό ID για το κουμπί.
  - `label`: Ετικέτα κουμπιού.
  - `execute(interaction, client)`: Λογική για το πάτημα του κουμπιού.

### Χειριστές Επιλογών

- Βρίσκονται στο `src/utils/selectMenus/`.
- Φορτώνονται αυτόματα από τον handler.
- Παράδειγμα: `suggestionTypeSelect.js`.
- Κάθε αρχείο μενού επιλογών εξάγει:
  - `customId`: Μοναδικό ID για το μενού.
  - `label`: Ετικέτα μενού.
  - `execute(interaction, client)`: Λογική για την επιλογή.

### Χειριστές Modal

- Βρίσκονται στο `src/utils/modals/`.
- Φορτώνονται αυτόματα από τον handler.
- Παράδειγμα: `communitybotSuggestion.js`, `discordSuggestion.js`, `youtubeSuggestion.js`.
- Κάθε αρχείο modal εξάγει:
  - `customId`: Μοναδικό ID για το modal.
  - `label` ή `title`: Ετικέτα/τίτλος modal.
  - `execute(interaction, client)`: Λογική για την υποβολή modal.

---

## Λεπτομέρειες Λειτουργιών

### Σύστημα Προτάσεων

- **Εντολή**: `/suggest`
- **Ροή**:
  1. Ο χρήστης εκτελεί `/suggest` (μόνο admin).
  2. Το bot στέλνει embed με μενού επιλογών (`suggestionTypeSelect`).
  3. Ο χρήστης επιλέγει τύπο (Discord, YouTube, CommunityBot).
  4. Το bot εμφανίζει modal για την πρόταση.
  5. Μετά την υποβολή, το bot δημοσιεύει την πρόταση στο κατάλληλο κανάλι με κουμπιά ψήφου.
  6. Κάθε μήνυμα πρότασης ξεκινά thread για συζήτηση.
  7. Οι ψήφοι παρακολουθούνται στη βάση δεδομένων· κάθε χρήστης μπορεί να ψηφίσει μόνο μία φορά ανά πρόταση.

- **Σχετικά Αρχεία**:
  - `src/slashCommands/General/suggest.js`
  - `src/utils/selectMenus/suggestionTypeSelect.js`
  - `src/utils/modals/discordSuggestion.js`
  - `src/utils/modals/youtubeSuggestion.js`
  - `src/utils/modals/communitybotSuggestion.js`
  - `src/utils/buttons/suggestionUpvote.js`
  - `src/utils/buttons/suggestionDownvote.js`

### Moderation

- **Εντολή**: `/ban`
- **Ροή**:
  1. Ο admin εκτελεί `/ban user [reason]`.
  2. Το bot ελέγχει δικαιώματα, αποκλείει τον χρήστη, στέλνει επιβεβαίωση.
  3. Το mod log αποστέλλεται στο ρυθμισμένο κανάλι.
- **Ρύθμιση**: `/set modlogs` για ορισμό καναλιού mod log.
- **Σχετικά Αρχεία**:
  - `src/slashCommands/Moderation/ban.js`
  - `src/slashCommands/Config/set.js`
  - `src/utils/modLog.js`

### Μετάφραση

- **Εντολή**: `/translate text language`
- **Ροή**:
  1. Ο χρήστης εκτελεί `/translate`.
  2. Το bot χρησιμοποιεί το Google Translate API για μετάφραση κειμένου.
  3. Το αποτέλεσμα αποστέλλεται ως embed.
- **Σχετικά Αρχεία**:
  - `src/slashCommands/General/translate.js`
  - `src/utils/translate.js`
  - `src/utils/languages.json` (κωδικοί γλωσσών)

### Εικόνες Καλωσορίσματος

- **Γεγονός**: `guildMemberAdd`
- **Ροή**:
  1. Όταν ένας χρήστης εισέρχεται, το bot δημιουργεί προσαρμοσμένη εικόνα με το όνομα χρήστη και τον αριθμό μελών.
  2. Η εικόνα αποστέλλεται στο κανάλι καλωσορίσματος.
- **Σχετικά Αρχεία**:
  - `src/events/Guild/guildMemberAdd.js`
  - `src/utils/welcome.js`
  - `fonts/` (προσαρμοσμένες γραμματοσειρές για εικόνες)

---

## Συνεισφορά

Δεχόμαστε συνεισφορές! Δείτε πώς μπορείτε να βοηθήσετε:

1. **Κάντε fork το αποθετήριο** και δημιουργήστε το branch σας.
2. **Προσθέστε τη λειτουργία ή το fix** στον κατάλληλο φάκελο:
   - Slash εντολές: `src/slashCommands/`
   - Γεγονότα: `src/events/`
   - Χειριστές κουμπιών: `src/utils/buttons/`
   - Χειριστές μενού επιλογών: `src/utils/selectMenus/`
   - Χειριστές modal: `src/utils/modals/`
   - Utilities: `src/utils/`
3. **Δοκιμάστε τις αλλαγές σας** τοπικά.
4. **Υποβάλετε pull request** με σαφή περιγραφή των αλλαγών σας.

**Οδηγίες:**
- Κρατήστε τον κώδικα αρθρωτό και ευανάγνωστο.
- Χρησιμοποιήστε αγγλικά για σχόλια και τεκμηρίωση.
- Για νέες εντολές, χρησιμοποιήστε το `SlashCommandBuilder` και ακολουθήστε τη δομή στο `src/slashCommands/`.
- Για νέα κουμπιά, modals ή μενού επιλογών, προσθέστε αρχεία στους αντίστοιχους φακέλους και εξάγετε τις απαιτούμενες ιδιότητες (`customId`, `label`, `execute`).
- Βεβαιωθείτε ότι οι handlers φορτώνονται αυτόματα από το σύστημα (δείτε `src/handlers/handle.js`).

---

## Υποστήριξη

Αν χρειάζεστε βοήθεια, μπείτε στον [CodeGRow server](https://discord.gg/NFXN8B7hMA) και κάντε tag τον autodevsigma!

---

## Άδεια

Ελεύθερο για χρήση χωρίς credits. Αν θέλετε να στηρίξετε, προσκαλέστε το [Sigma Bot](https://theauto.dev/bots/sigmabot) στον server σας!

---

## Credits

Αυτό το template δημιουργήθηκε από τον theautodev. Το Sigma Bot (https://theauto.dev) τρέχει με αυτό το template. Ελεύθερο για χρήση χωρίς credits. Απλά προσθέστε το Sigma Bot στον server σας και είμαστε εντάξει.

---

**Για περισσότερα παραδείγματα και προχωρημένη χρήση, δείτε τον πηγαίο κώδικα και τα σχόλια σε κάθε αρχείο. Καλή κωδικοποίηση!**

## English
# CommunityBot

[![Discord](https://img.shields.io/badge/Discord-Join-blue.svg)](https://theauto.dev/discord)
[![GitHub](https://img.shields.io/github/stars/autodevsigma/communityBot.svg?style=social)](https://github.com/autodevsigma/communityBot)

CommunityBot is an open-source Discord bot created by [autodevsigma](https://github.com/autodevsigma) for the CodeGRow community. Its goal is to help beginners get started with [discord.js](https://discord.js.org/) by providing a clean, modular template with useful features and easy extensibility.

---

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Core Architecture](#core-architecture)
  - [Database](#database)
  - [Slash Commands](#slash-commands)
  - [Events](#events)
  - [Button Handlers](#button-handlers)
  - [Select Menu Handlers](#select-menu-handlers)
  - [Modal Handlers](#modal-handlers)
- [Feature Details](#feature-details)
  - [Suggestions System](#suggestions-system)
  - [Moderation](#moderation)
  - [Translation](#translation)
  - [Welcome Images](#welcome-images)
- [Contributing](#contributing)
- [Support](#support)
- [License](#license)

---

## Features

- **Custom Database**: MongoDB-based, similar to QuickDB, for storing guild/user data.
- **Slash Commands**: Modular, auto-loaded from folders.
- **Moderation**: Ban users, mod logs, configurable embed colors.
- **Suggestions System**: Interactive select menus, modals, upvote/downvote buttons, threads for discussion.
- **Translation**: Translate any text to any language using Google Translate.
- **Welcome Images**: Custom banners for new members.
- **Extensible Handlers**: Easily add buttons, modals, select menus, and events.

---

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/autodevsigma/communityBot.git
cd communityBot
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Configure the Bot

Copy `src/config.js.example` to `src/config.js` and fill in your bot token, MongoDB URL, and other settings:

```js
module.exports = {
  token: "YOUR_BOT_TOKEN",
  betatoken: "YOUR_BETA_TOKEN",
  id: "YOUR_BOT_ID",
  betaID: "YOUR_BETA_ID",
  ownerID: "YOUR_USER_ID",
  mongourl: "YOUR_MONGODB_URL",
  embedColor: 0x00ffff,
  status: "GLOBAL", // or "BETA"
}
```

### 4. Start the Bot

```sh
npm start
```

---

## Configuration

- All configuration is done in `src/config.js`.
- You can set the bot token, MongoDB URL, embed color, and status (GLOBAL/BETA).
- The bot supports both main and beta tokens for testing.

---

## Core Architecture

### Database

- Located in `src/utils/Database.js`.
- Uses MongoDB via Mongoose.
- API:
  ```js
  client.db.set(key, value)
  client.db.get(key)
  client.db.add(key, value)
  client.db.delete(key)
  client.db.push(key, value)
  client.db.pull(key, value)
  client.db.has(key)
  ```
- Used for storing settings, suggestion votes, mod log channels, etc.

### Slash Commands

- Located in `src/slashCommands/`.
- Auto-loaded by the handler in `src/handlers/handle.js`.
- Example:
  ```js
  const { SlashCommandBuilder } = require("discord.js");
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("ping")
      .setDescription("Pong!"),
    async execute(interaction, client) {
      interaction.reply({ content: "Pong 🏓", ephemeral: true });
    }
  }
  ```

### Events

- Located in `src/events/Client/` and `src/events/Guild/`.
- Auto-loaded by the handler.
- Examples: `ready.js`, `interactionCreate.js`, `guildMemberAdd.js`.

### Button Handlers

- Located in `src/utils/buttons/`.
- Auto-loaded by the handler.
- Example: `suggestionUpvote.js`, `suggestionDownvote.js`.
- Each button file exports:
  - `customId`: Unique ID for the button.
  - `label`: Button label.
  - `execute(interaction, client)`: Logic for button press.

### Select Menu Handlers

- Located in `src/utils/selectMenus/`.
- Auto-loaded by the handler.
- Example: `suggestionTypeSelect.js`.
- Each select menu file exports:
  - `customId`: Unique ID for the select menu.
  - `label`: Menu label.
  - `execute(interaction, client)`: Logic for menu selection.

### Modal Handlers

- Located in `src/utils/modals/`.
- Auto-loaded by the handler.
- Example: `communitybotSuggestion.js`, `discordSuggestion.js`, `youtubeSuggestion.js`.
- Each modal file exports:
  - `customId`: Unique ID for the modal.
  - `label` or `title`: Modal label/title.
  - `execute(interaction, client)`: Logic for modal submission.

---

## Feature Details

### Suggestions System

- **Command**: `/suggest`
- **Flow**:
  1. User runs `/suggest` (admin only).
  2. Bot sends an embed with a select menu (`suggestionTypeSelect`).
  3. User selects type (Discord, YouTube, CommunityBot).
  4. Bot shows a modal for the suggestion.
  5. On submit, bot posts the suggestion in the appropriate channel with upvote/downvote buttons.
  6. Each suggestion message starts a thread for discussion.
  7. Votes are tracked in the database; users can only vote once per suggestion.

- **Files Involved**:
  - `src/slashCommands/General/suggest.js`
  - `src/utils/selectMenus/suggestionTypeSelect.js`
  - `src/utils/modals/discordSuggestion.js`
  - `src/utils/modals/youtubeSuggestion.js`
  - `src/utils/modals/communitybotSuggestion.js`
  - `src/utils/buttons/suggestionUpvote.js`
  - `src/utils/buttons/suggestionDownvote.js`

### Moderation

- **Command**: `/ban`
- **Flow**:
  1. Admin runs `/ban user [reason]`.
  2. Bot checks permissions, bans user, sends confirmation.
  3. Mod log is sent to the configured channel.
- **Config**: `/set modlogs` to set mod log channel.
- **Files Involved**:
  - `src/slashCommands/Moderation/ban.js`
  - `src/slashCommands/Config/set.js`
  - `src/utils/modLog.js`

### Translation

- **Command**: `/translate text language`
- **Flow**:
  1. User runs `/translate`.
  2. Bot uses Google Translate API to translate text.
  3. Result is sent as an embed.
- **Files Involved**:
  - `src/slashCommands/General/translate.js`
  - `src/utils/translate.js`
  - `src/utils/languages.json` (language codes)

### Welcome Images

- **Event**: `guildMemberAdd`
- **Flow**:
  1. When a user joins, bot generates a custom image with their username and member count.
  2. Image is sent to the welcome channel.
- **Files Involved**:
  - `src/events/Guild/guildMemberAdd.js`
  - `src/utils/welcome.js`
  - `fonts/` (custom fonts for images)

---

## Contributing

We welcome contributions! Here’s how you can help:

1. **Fork the repository** and create your branch.
2. **Add your feature or fix** in the appropriate folder:
   - Slash commands: `src/slashCommands/`
   - Events: `src/events/`
   - Button handlers: `src/utils/buttons/`
   - Select menu handlers: `src/utils/selectMenus/`
   - Modal handlers: `src/utils/modals/`
   - Utilities: `src/utils/`
3. **Test your changes** locally.
4. **Submit a pull request** with a clear description of your changes.

**Guidelines:**
- Keep code modular and readable.
- Use English for code comments and documentation.
- For new commands, use the `SlashCommandBuilder` and follow the structure in `src/slashCommands/`.
- For new buttons, modals, or select menus, add files in their respective folders and export the required properties (`customId`, `label`, `execute`).
- Make sure your handlers are auto-loaded by the system (see `src/handlers/handle.js`).

---

## Support

If you need help, join our [CodeGRow server](https://discord.gg/NFXN8B7hMA) and tag autodevsigma!

---

## License

Free to use without credits. If you want to support, invite [Sigma Bot](https://theauto.dev/bots/sigmabot) to your server!

---

## Credits

This template is made by theautodev. Sigma Bot aka https://theauto.dev is running with this template. Free to use without credits. Just add Sigma Bot in your server and we're cool.

---

**For more examples and advanced usage, check the source code and comments in each file. Happy coding!**


