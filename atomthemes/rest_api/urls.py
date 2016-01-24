from .packages import ThemeListView
from django.conf.urls import url

urlpatterns = [
    url(r'^themes$', ThemeListView.as_view()),
]
