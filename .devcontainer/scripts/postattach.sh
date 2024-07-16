RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Configuring Git User...${NC}"

# Check if git authentication status is negative
if  gh auth status | grep -q "You are not logged into any GitHub hosts."; then
    echo -e "${RED}Git authentication status is negative. Performing login...${NC}"
    gh auth login
else
    echo -e "${GREEN}Git authentication status is positive. No need to login.${NC}"
fi

echo "run 'gh auth status' to see more details."
echo ''

# run npm run start:devcontainer
echo -e "${BLUE}npm run start:devcontainer...${NC}"
npm run start:devcontainer