from atomthemes.packages.models import Theme
from rest_framework import serializers
from rest_framework import generics

from .pagination import LinkHeaderPagination


class ThemeSerializer(serializers.ModelSerializer):
    atom_url = serializers.ReadOnlyField()

    class Meta:
        model = Theme


class ThemeListView(generics.ListAPIView):
    pagination_class = LinkHeaderPagination
    serializer_class = ThemeSerializer
    queryset = Theme.objects.all()

    def get_queryset(self):
        queryset = super().get_queryset()
        theme = self.request.query_params.get('type')
        query = self.request.query_params.get('query')
        queryset = queryset.filter(theme=theme)
        if query:
            queryset = queryset.filter(name__icontains=query)
        return queryset
