from django.db import models


class Theme(models.Model):
    name = models.CharField(max_length=255, db_index=True)
    theme = models.CharField(max_length=50, db_index=True)
    repository_url = models.URLField(blank=True)
    version = models.CharField(max_length=50, blank=True, null=True)
    screenshot = models.URLField(blank=True, null=True)
    downloads = models.IntegerField(default=0)
    stars = models.IntegerField(default=0)

    @property
    def atom_io_url(self):
        return 'https://atom.io/themes/' + self.name

    class Meta:
        ordering = ['-downloads', '-stars']

    def __str__(self):
        return self.name
