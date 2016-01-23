from django.core.management import BaseCommand
from atomthemes.packages.models import Theme


class Command(BaseCommand):
    def handle(self, *args, **options):
        themes = Theme.objects.all()
        count = len(themes)
        themes.delete()

        self.stdout.write('{} themes removed'.format(count))
