```
____                                __                               ______  ______  ______
/\  _`\                             /\ \__                           /\__  _\/\__  _\/\__  _\
\ \ \L\_\     __    ___ ___     ____\ \ ,_\   ___     ___      __    \/_/\ \/\/_/\ \/\/_/\ \/
 \ \ \L_L   /'__`\/' __` __`\  /',__\\ \ \/  / __`\ /' _ `\  /'__`\     \ \ \   \ \ \   \ \ \
  \ \ \/, \/\  __//\ \/\ \/\ \/\__, `\\ \ \_/\ \L\ \/\ \/\ \/\  __/      \_\ \__ \_\ \__ \_\ \__
   \ \____/\ \____\ \_\ \_\ \_\/\____/ \ \__\ \____/\ \_\ \_\ \____\     /\_____\/\_____\/\_____\
    \/___/  \/____/\/_/\/_/\/_/\/___/   \/__/\/___/  \/_/\/_/\/____/     \/_____/\/_____/\/_____/
```

![Screenshot](/resources/gemstone3-github-screenshot-05.png)
![Screenshot](/resources/gemstone3-github-screenshot-04.png)
![Screenshot](/resources/gemstone3-github-screenshot-02.png)
![Screenshot](/resources/gemstone3-github-screenshot-03.png)
![Screenshot](/resources/gemstone3-github-screenshot-01.png)


# Get Started - Development Workflow
1. **Start**: `docker compose up -d`
2. **Monitor**: `docker compose logs -f gemstone` (in separate terminal)
3. **Connect**: `telnet localhost 4000` or `./dev-login.expect zoso gcsgcsgcs 3 for autologin`
4. **Code**: Edit files in Cursor (auto-syncs to container)
5. **Test**: Changes appear immediately in the game
6. **Stop**: `docker compose down`

## Installation

### Prerequisites
- Node.js >= 10.12.0
- Git

### Initial Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd gemstone3
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Bundle Installation

This project uses a bundle system where functionality is organized into separate modules. Bundles are managed as git submodules.

#### Install All Default Bundles (Recommended)
To install all the default bundles that come with the project:

```bash
npm run init
```

This will:
- Prompt you to install example bundles
- Install all default bundles from the gregstadermann GitHub organization
- Add them as git submodules
- Enable them in your `gemstone.json` configuration
- Commit the changes

#### Install Individual Bundles
To install a specific bundle from a remote repository:

```bash
npm run install-bundle <remote-url>
```

Examples:
```bash
# Using HTTPS
npm run install-bundle https://github.com/gregstadermann/areas

# Using SSH
npm run install-bundle git@github.com:gregstadermann/areas.git
```

#### Initialize Existing Bundles
If bundles are already configured but not downloaded:

```bash
git submodule update --init --recursive
```

#### Bundle Management Commands
- **Update bundle remote URL**: `npm run update-bundle-remote`
- **Remove a bundle**: `npm run remove-bundle`
- **Check bundle status**: `git submodule status`
- **Update all bundles**: `git submodule update --recursive`

## Development Workflow

### Working with Git Submodules

This project uses git submodules for bundle management. Here's the recommended workflow for making changes and committing them:

#### Making Changes
1. **Edit files** in any bundle directory (e.g., `bundles/commands/`, `bundles/combat/`)
2. **Test your changes** by running the MUD: `npm start`

#### Committing Changes
When you're ready to commit your changes:

1. **Commit all submodule changes**:
   ```bash
   git submodule foreach 'git add . && git commit -m "Update bundle content" || true'
   ```
   This command:
   - Goes into each submodule (bundle)
   - Adds all modified files
   - Commits them with a message
   - Continues even if a submodule has no changes (`|| true`)

2. **Commit main project changes**:
   ```bash
   git add . && git commit -m "Update all bundles and main project"
   ```

3. **Push everything to remote**:
   ```bash
   git push origin master
   ```

#### Alternative: Manual Submodule Commits
If you prefer to commit submodules individually:

```bash
# Go into a specific bundle
cd bundles/commands

# Add and commit changes
git add .
git commit -m "Fix look command functionality"

# Go back to main project
cd ../..

# Commit the submodule update
git add bundles/commands
git commit -m "Update commands bundle"
```

#### Checking Status
- **See all changes**: `git status`
- **See submodule status**: `git submodule status`
- **See changes in a specific bundle**: `cd bundles/commands && git status`

### Default Bundles Included
The following bundles are included by default:
- **areas** - Game areas and rooms
- **channels** - Communication channels
- **classes** - Character classes
- **combat** - Combat system
- **commands** - Game commands
- **debug** - Debug utilities
- **effects** - Game effects
- **input-events** - Input event handling
- **lib** - Core library functions
- **lootable-npcs** - NPCs that can be looted
- **npc-behaviors** - NPC AI behaviors
- **player-events** - Player event handling
- **player-groups** - Grouping system
- **progressive-respawn** - Progressive respawn mechanics
- **quests** - Quest system
- **simple-crafting** - Basic crafting system
- **telnet-networking** - Telnet server
- **vendor-npcs** - NPC vendors
- **websocket-networking** - WebSocket server

### Running the MUD
Once bundles are installed:

```bash
npm start
```

## Troubleshooting

### Missing Ranvier Dependency
If you encounter an error like `Cannot find module 'ranvier'`, this means the Ranvier core engine is missing. The project expects it to be located at `../gemstone3-core` relative to the project directory.

**Solution**: Install the Ranvier engine from npm:

```bash
npm install ranvier@3.0.6
```

Or if you have the gemstone3-core repository locally, ensure it's cloned in the parent directory:

```bash
cd ..
git clone <gemstone3-core-repository-url> gemstone3-core
cd gemstone3
npm install
```

### Bundle Issues
If bundles are not loading properly:

1. **Check bundle status**: `git submodule status`
2. **Reinitialize bundles**: `git submodule update --init --recursive`
3. **Verify bundle configuration**: Check that bundles are listed in `gemstone.json`

### Common Commands
- **Check installed packages**: `npm list`
- **Reinstall dependencies**: `rm -rf node_modules package-lock.json && npm install`
- **Update all bundles**: `git submodule update --recursive`

### Additional Dependencies
If you encounter missing module errors, install these additional dependencies:

```bash
# Install missing dependencies in gemstone3-core
cd ../gemstone3-core
npm install require-dir ranvier-telnet

# Install missing dependencies in main project
cd ../gemstone3
npm install ranvier-telnet ws
```

### Server Status
When the MUD starts successfully, you'll see:
- ✅ **Telnet server started on port: 4000**
- ✅ **Websocket server started on port: 4001**
- ✅ All bundles loaded and entities spawned

**Connect to your MUD:**
- **Telnet**: `telnet localhost 4000`
- **WebSocket**: `ws://localhost:4001`

### Data Storage
The MUD uses JSON files for all data storage, eliminating the need for external databases.

## Client Setup

### Connecting to the MUD
Once your MUD server is running, you can connect using various clients:

#### Terminal/Telnet Client
```bash
# Connect via telnet
telnet localhost 4000

# Or using netcat
nc localhost 4000
```

#### Web Browser
Open your web browser and navigate to: `http://localhost:4001`

#### Desktop Client (Electron-based)
If you have an Electron-based MUD client (like Neuro), you may encounter missing system libraries on Linux:

**Install Required Dependencies:**
```bash
# Update package list
sudo apt update

# Install required libraries for Electron
sudo apt install -y libnss3-dev libatk-bridge2.0-dev libdrm2 libxcomposite1 libxdamage1 libxrandr2 libgbm1 libxss1 libasound2

# Alternative: Install all common Electron dependencies
sudo apt install -y libnss3-dev libatk-bridge2.0-dev libdrm2 libxcomposite1 libxdamage1 libxrandr2 libgbm1 libxss1 libasound2 libgtk-3-dev libx11-xcb-dev libxcb-dri3-dev libxcb-util0-dev libxcb-randr0-dev libxcb-xtest0-dev libxcb-xinerama0-dev libxcb-xkb-dev libxcb-xfixes0-dev libxcb-shape0-dev libxcb-render-util0-dev libxcb-keysyms1-dev libxcb-image0-dev libxcb-icccm4-dev libxcb-glx0-dev libxcb-cursor-dev libxcb-aux0-dev libxcb-util1-dev libxcb-xrm0-dev libxcb-xf86dri0-dev libxcb-shm0-dev libxcb-present-dev libxcb-sync-dev libxcb-dri2-0-dev
```

**Troubleshooting Electron Clients:**
```bash
# Check what libraries are missing
ldd /path/to/client/node_modules/electron/dist/electron | grep "not found"
n
# If still having issues, try running with no-sandbox flag
npm run start -- --no-sandbox

# Or reinstall Electron dependencies
rm -rf node_modules
npm install
```

### Client Configuration
Most MUD clients will need to be configured with:
- **Host**: `localhost` (or your server IP)
- **Port**: `4000` (Telnet) or `4001` (WebSocket)
- **Protocol**: Telnet or WebSocket depending on client

For more information, visit [gregstadermann.com](https://gregstadermann.com) for guides and API references.

// use the dev-login.expect script at the project root to launch and login to a character
./dev-login.expect zoso gcsgcsgcs 3

// run the dev script which has a nodedaemon running with to restart server on file change.  use with above
  npm run dev

// Kill al lrunning servers
  pkill -f "node gemstone"

// The script will automatically go through all the character creation steps up to the stat assignment phase, then hand control back to you so you can test the stat assignment and skill training systems we've been working on.
  ./dev-create-character.expect your_account your_password

## 🐳 Docker Development Environment

For a containerized development environment with MongoDB included:

### Quick Start
```bash
# Start the development environment
cd docker-dev
docker compose up -d

# View server logs (real-time)
docker compose logs -f gemstone

# Connect to the game
telnet localhost 4000

# Stop when done
docker compose down
```

### What's Included
- **Gemstone3**: Your main game server
- **Gemstone3-Core**: Ranvier framework (mounted as volume)
- **MongoDB**: Database service ready for player data
- **Auto-reload**: File changes automatically restart the server
- **Volume Mounting**: Edit files in Cursor, changes sync instantly


### Troubleshooting
```bash
# Check container status
docker compose ps

# Restart just the game server
docker compose restart gemstone

# Access container shell
docker compose exec gemstone sh

# View all logs
docker compose logs
```

### Commit specific bundle
./git-commit.sh classes "Update warrior class skills"