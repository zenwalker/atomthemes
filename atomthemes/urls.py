from django.conf.urls import url, include
from django.contrib import admin

urlpatterns = [
    url(r'^django/', admin.site.urls),
    url(r'^api/', include('atomthemes.rest_api.urls')),
]
