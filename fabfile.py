from fabric.contrib.project import rsync_project
from fabric.context_managers import prefix
from fabric.contrib.console import confirm
from fabric.operations import local, run
from fabric.api import env, task
import os

env.user = 'atomthemes'
env.hosts = ['zenwalker.ru']

EXCLUDE_FILES = (
    './frontend',
    'public/media',
    'node_modules',
    'bower_components',
    '__pycache__',
    'webpack.config.js',
    'package.json',
    'npm-debug.log',
    'gulpfile.js',
    '.DS_Store',
    'webapp',
    '*.orig',
    '*.db',
    '*.pyc',
    '*.sh',
    '.*'
)


def deploy(remote_dir, touch_file=None):
    local('npm run build')

    manage_py = 'python ' + os.path.join(remote_dir, 'manage.py')
    rsync_project(local_dir='./', remote_dir=remote_dir, exclude=EXCLUDE_FILES, delete=True)

    with prefix('source ~/activate'):
        run('pip install -r ' + os.path.join(remote_dir, 'requirements.txt'))
        run(manage_py + ' collectstatic --noinput')
        run(manage_py + ' migrate')

    if touch_file:
        run('touch ' + os.path.join(remote_dir, touch_file))


@task
def deploy_prod():
    deploy('~/www/atomthemes.ru')
