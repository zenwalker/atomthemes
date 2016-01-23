from atomthemes.celery import celery_app
from .readme import ReadmeReader
from .models import Theme
import logging

logger = logging.getLogger(__name__)


@celery_app.task
def discover_page(page):
    count = 0
    allowed_types = set(['syntax', 'ui'])
    for package_data in page.get_items():
        meta = package_data['metadata']
        theme_type = meta.get('theme')
        if theme_type and theme_type in allowed_types:
            logger.info('Found theme: ' + package_data['name'])
            theme_factory = ThemeFactory(package_data)
            theme_factory.save_to_db()
            count += 1
    return count


class ThemeFactory:
    def __init__(self, package_data):
        self.package_data = package_data

    def save_to_db(self):
        theme, created = Theme.objects.get_or_create(name=self.package_data['name'])
        current_version = self.package_data['releases']['latest']
        theme.stars = self.package_data['stargazers_count']
        theme.downloads = self.package_data['downloads']

        if created:
            theme.repository_url = self.package_data['repository']['url']
            theme.theme = self.package_data['metadata']['theme']

        if created or current_version != theme.version:
            theme.screenshot = self.extract_screenshot()
            theme.version = current_version

        theme.save()
        return theme

    def extract_screenshot(self):
        readme = ReadmeReader(self.package_data['readme'])
        return readme.get_screenshot()
