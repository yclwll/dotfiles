# If you come from bash you might have to change your $PATH.
# export PATH=$HOME/bin:/usr/local/bin:$PATH
  export TERM=xterm-256color
# Path to your oh-my-zsh installation.
  export ZSH=/home/lichking/.oh-my-zsh

POWERLEVEL9K_MODE='nerdfont-complete'

# Set name of the theme to load. Optionally, if you set this to "random"
# it'll load a random theme each time that oh-my-zsh is loaded.
# See https://github.com/robbyrussell/oh-my-zsh/wiki/Themes
ZSH_THEME="powerlevel9k/powerlevel9k"

# Set list of themes to load
# Setting this variable when ZSH_THEME=random
# cause zsh load theme from this variable instead of
# looking in ~/.oh-my-zsh/themes/
# An empty array have no effect
# ZSH_THEME_RANDOM_CANDIDATES=( "robbyrussell" "agnoster" )

# Uncomment the following line to use case-sensitive completion.
# CASE_SENSITIVE="true"

# Uncomment the following line to use hyphen-insensitive completion. Case
# sensitive completion must be off. _ and - will be interchangeable.
# HYPHEN_INSENSITIVE="true"

# Uncomment the following line to disable bi-weekly auto-update checks.
# DISABLE_AUTO_UPDATE="true"

# Uncomment the following line to change how often to auto-update (in days).
# export UPDATE_ZSH_DAYS=13

# Uncomment the following line to disable colors in ls.
# DISABLE_LS_COLORS="true"

# Uncomment the following line to disable auto-setting terminal title.
# DISABLE_AUTO_TITLE="true"

# Uncomment the following line to enable command auto-correction.
# ENABLE_CORRECTION="true"

# Uncomment the following line to display red dots whilst waiting for completion.
# COMPLETION_WAITING_DOTS="true"

# Uncomment the following line if you want to disable marking untracked files
# under VCS as dirty. This makes repository status check for large repositories
# much, much faster.
# DISABLE_UNTRACKED_FILES_DIRTY="true"

# Uncomment the following line if you want to change the command execution time
# stamp shown in the history command output.
# The optional three formats: "mm/dd/yyyy"|"dd.mm.yyyy"|"yyyy-mm-dd"
# HIST_STAMPS="mm/dd/yyyy"

# Would you like to use another custom folder than $ZSH/custom?
# ZSH_CUSTOM=/path/to/new-custom-folder

# Which plugins would you like to load? (plugins can be found in ~/.oh-my-zsh/plugins/*)
# Custom plugins may be added to ~/.oh-my-zsh/custom/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
plugins=(git zsh-autosuggestions zsh-syntax-highlighting nmap python django)

source $ZSH/oh-my-zsh.sh


# You may need to manually set your language environment
# export LANG=en_US.UTF-8

# Preferred editor for local and remote sessions
# if [[ -n $SSH_CONNECTION ]]; then
#   export EDITOR='vim'
# else
#   export EDITOR='mvim'
# fi

# Compilation flags
# export ARCHFLAGS="-arch x86_64"

# ssh
export SSH_KEY_PATH="~/.ssh/id_rsa"

# Set personal aliases, overriding those provided by oh-my-zsh libs,
# plugins, and themes. Aliases can be placed here, though oh-my-zsh
# users are encouraged to define aliases within the ZSH_CUSTOM folder.
# For a full list of active aliases, run `alias`.
#
# Example aliases
# alias zshconfig="mate ~/.zshrc"
# alias ohmyzsh="mate ~/.oh-my-zsh"

FOREGROUND=000
BACKGROUND=004
RED=001
GREEN=002
PINK=003
BLUE=004
PURPLE=005
YELLOW=006
WHITE=007
DEFAULT_COLOR=$FOREGROUND

POWERLEVEL9K_SHORTEN_DIR_LENGTH=2

POWERLEVEL9K_ALWAYS_SHOW_CONTEXT=true

POWERLEVEL9K_CONTEXT_TEMPLATE="%n@%m"

POWERLEVEL9K_CONTEXT_DEFAULT_FOREGROUND="$BACKGROUND"
POWERLEVEL9K_CONTEXT_DEFAULT_BACKGROUND="$PURPLE"
POWERLEVEL9K_CONTEXT_ROOT_FOREGROUND="$FOREGROUND"
POWERLEVEL9K_CONTEXT_ROOT_BACKGROUND="$BACKGROUND"

POWERLEVEL9K_LEFT_SEGMENT_SEPARATOR="\uE0B4"
POWERLEVEL9K_LEFT_SUBSEGMENT_SEPARATOR="%F{$(( $FOREGROUND ))}|%f"
POWERLEVEL9K_RIGHT_SEGMENT_SEPARATOR="\uE0B6"
POWERLEVEL9K_RIGHT_SUBSEGMENT_SEPARATOR="%F{$(( $FOREGROUND ))}|%f"

POWERLEVEL9K_VCS_CLEAN_BACKGROUND="$GREEN"
POWERLEVEL9K_VCS_CLEAN_FOREGROUND="$FOREGROUND"
POWERLEVEL9K_VCS_MODIFIED_BACKGROUND="$YELLOW"
POWERLEVEL9K_VCS_MODIFIED_FOREGROUND="$FOREGROUND"
POWERLEVEL9K_VCS_UNTRACKED_BACKGROUND="$PINK"
POWERLEVEL9K_VCS_UNTRACKED_FOREGROUND="$FOREGROUND"

POWERLEVEL9K_DIR_HOME_BACKGROUND="$BACKGROUND"
POWERLEVEL9K_DIR_HOME_FOREGROUND="$FOREGROUND"
POWERLEVEL9K_DIR_HOME_SUBFOLDER_BACKGROUND="$BACKGROUND"
POWERLEVEL9K_DIR_HOME_SUBFOLDER_FOREGROUND="$FOREGROUND"
POWERLEVEL9K_DIR_DEFAULT_BACKGROUND="$BACKGROUND"
POWERLEVEL9K_DIR_DEFAULT_FOREGROUND="$FOREGROUND"
POWERLEVEL9K_DIR_WRITABLE_FORBIDDEN_BACKGROUND="$RED"
POWERLEVEL9K_DIR_WRITABLE_FORBIDDEN_FOREGROUND="$FOREGROUND"

POWERLEVEL9K_ROOT_INDICATOR_BACKGROUND="$BACKGROUND"
POWERLEVEL9K_ROOT_INDICATOR_FOREGROUND="$YELLOW"
POWERLEVEL9K_ROOT_ICON=$'\uF198' # 


POWERLEVEL9K_VIRTUALENV_FOREGROUND="$FOREGROUND"
POWERLEVEL9K_VIRTUALENV_BACKGROUND="$GREEN"


POWERLEVEL9K_OS_ICON_FOREGROUND="$BLUE"
POWERLEVEL9K_OS_ICON_BACKGROUND="$PURPLE"
OS_ICON=' \uF300'

ZSH_HIGHLIGHT_HIGHLIGHTERS=(main brackets pattern)

typeset -A ZSH_HIGHLIGHT_STYLES
# Override highlighter colors
ZSH_HIGHLIGHT_STYLES[default]="$WHITE"
ZSH_HIGHLIGHT_STYLES[unknown-token]=fg="$RED",bold
ZSH_HIGHLIGHT_STYLES[reserved-word]=fg="$RED",bold
ZSH_HIGHLIGHT_STYLES[alias]=fg="$GREEN",bold
ZSH_HIGHLIGHT_STYLES[builtin]=fg="$GREEN",bold
ZSH_HIGHLIGHT_STYLES[function]=fg="$GREEN",bold
ZSH_HIGHLIGHT_STYLES[command]=fg="$GREEN",bold
ZSH_HIGHLIGHT_STYLES[precommand]=fg="$GREEN",underline
ZSH_HIGHLIGHT_STYLES[commandseparator]=none
ZSH_HIGHLIGHT_STYLES[hashed-command]=fg="$RED",bold
ZSH_HIGHLIGHT_STYLES[path]=fg="$GREEN",underline
ZSH_HIGHLIGHT_STYLES[globbing]=fg="$BLUE"
ZSH_HIGHLIGHT_STYLES[history-expansion]=fg="$WHITE",underline
ZSH_HIGHLIGHT_STYLES[single-hyphen-option]=none
ZSH_HIGHLIGHT_STYLES[double-hyphen-option]=none
ZSH_HIGHLIGHT_STYLES[back-quoted-argument]=none
ZSH_HIGHLIGHT_STYLES[single-quoted-argument]=fg="$GREEN"
ZSH_HIGHLIGHT_STYLES[double-quoted-argument]=fg="$GREEN"
ZSH_HIGHLIGHT_STYLES[dollar-double-quoted-argument]=fg="$RED"
ZSH_HIGHLIGHT_STYLES[back-double-quoted-argument]=fg="$RED"
ZSH_HIGHLIGHT_STYLES[assign]=none

POWERLEVEL9K_LEFT_PROMPT_ELEMENTS=(virtualenv os_icon root_indicator context dir vcs dir_writable)
POWERLEVEL9K_RIGHT_PROMPT_ELEMENTS=()



export EDITOR='vim'
export VISUAL='vim'
