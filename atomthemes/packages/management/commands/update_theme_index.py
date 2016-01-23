from atomthemes.packages.tasks import discover_page
from atomthemes.packages.atom_io import atom_api
from django.core.management import BaseCommand


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument('--keyword', dest='keyword')

    def handle(self, *args, **options):
        if options['keyword']:
            pages = atom_api.search(options['keyword'], filter='theme')
        else:
            pages = atom_api.packages()

        for page in pages:
            discover_page.delay(page)

        self.stdout.write('{} pages found'.format(len(pages)))
