# Automagical Slack "now playing" status

Set your status to `🎵 Artist - Track [Album / Year]` when you play music from iTunes or Spotify.

Ignores updates if it sees you set a status manually.

# Setup

### 1. Clone this repo, `cd` to directory

### 2. Install dependencies
- `brew install ruby`
- `gem install eventmachine eventmachine-distributed-notification activesupport json`
- `npm install`

### 3. Setup your Slack token
- Generate a slack token from https://api.slack.com/custom-integrations/legacy-tokens
- Rename `.env.example` to `.env`
- Paste your token in, as `TOKEN=ABC123` (but your real token)

# Run

- `npm start`
