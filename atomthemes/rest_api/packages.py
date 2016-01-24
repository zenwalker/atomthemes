from atomthemes.packages.models import Theme
from rest_framework import serializers
from rest_framework import generics
from .utils import LinkHeaderPagination


class ThemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Theme


class ThemeListView(generics.ListAPIView):
    pagination_class = LinkHeaderPagination
    serializer_class = ThemeSerializer
    queryset = Theme.objects.all()
    page_size = 2

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset.filter(theme=self.kwargs['type'])[:10]
