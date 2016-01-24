from django.views.generic import View
from django.http import HttpResponse
from urllib.request import Request, urlopen


class Proxy(View):
    base_url = None

    def handle(self, request, *args, **kwargs):
        request_url = self.base_url + request.get_full_path()
        proxy_request = Request(request_url, None, {})
        response = urlopen(proxy_request)
        response_body = response.read()
        status = response.getcode()
        return HttpResponse(response_body, status=status,
                content_type=response.headers['content-type'])

    get = handle
    post = handle


class WebpackProxy(Proxy):
    base_url = 'http://localhost:8001'
