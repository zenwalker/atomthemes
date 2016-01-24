from .packages import ThemeListView
from django.conf.urls import url

urlpatterns = [
    url(r'^themes/(?P<type>\w+)', ThemeListView.as_view()),
]
