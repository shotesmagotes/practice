# Bash Scripting

## Linux System Flow
The init script, commonly found in /etc/rc.d/init.d or /etc/init.d directory, launches system services for UNIX. The Init process reads its configuration files and decides which services to run in each run-level. The run-level is a operating state that the operating system can boot into. Typically, there are 7 run-levels, the most common being a multi-user state with no GUI, or a multi-user state with GUI. There are also other run-levels where the system does not do anything, or for when the system needs to reboot.


When the shell starts, it reads configuration files from /etc/profile, and /etc/.bash_profile. This is where the PATH variable is defined for all users on the system. The /etc/profile config file is read by all shells, whereas the .bash_profile is read only by the bash shell. the ~/.bash_profile configuration file is the preferred way to configure a user specific environment (notice it is not in /etc/ but rather in the user's home directory ~/). The ~/.bash_login file is read to configure bash upon login. When both the .bash_profile and .bash_login files are missing, ~/.profile is read.

On Mac OSX and other GUI enabled operating systems, it is typical that the user does not use a login shell, because they are already logged in and they use a X terminal window system to use the shell. In this case, and in the case when the user DOES use a login shell, the .bashrc file is read. Therefore, the ~/.bashrc file is always read for that particular user, and can be used to avoid repeating the same config lines across multiple files (for instance repeating configurations in .bash_login and in .bash_profile for when the user logs in to a shell or when the user uses a non-login shell). 


