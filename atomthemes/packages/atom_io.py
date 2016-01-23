from urllib.parse import urlparse, parse_qs
from django.conf import settings
import requests


class AtomApi:
    def __init__(self, api_token):
        self.api_token = api_token
        self.api_prefix = 'https://atom.io/api/'

    def request(self, path, **params):
        params.setdefault('sort', 'downloads')
        params.setdefault('order', 'desc')
        return PagePool(self.api_prefix + path, params, headers={
            'Authorization': self.api_token,
        })

    def packages(self, **params):
        return self.request('packages', **params)

    def search(self, q, **params):
        params['q'] = q
        return self.request('packages/search', **params)


class PagePool:
    def __init__(self, request_url, params={}, headers={}):
        self.request_url = request_url
        self.request_headers = headers
        self.request_params = params

        self.first_page_response = requests.get(request_url, params=params, headers=headers)
        self.page_count = self.page_number_from_url(self.first_page_response.links['last']['url']) - 1
        print(self.first_page_response.links['last'])

    def __iter__(self):
        for page_n in range(self.page_count):
            yield self[page_n]

    def __getitem__(self, page_n):
        params = self.request_params.copy()
        params['page'] = page_n
        page = Page(self.request_url, params, self.request_headers)
        if page_n == 0:
            page.set_response(self.first_page_response)
        return page

    def __len__(self):
        return self.page_count + 1

    @staticmethod
    def page_number_from_url(url):
        parse_result = urlparse(url)
        page = parse_qs(parse_result.query).get('page', [])
        if not page:
            return 1
        return int(page[0])


class Page:
    def __init__(self, request_url, params={}, headers={}):
        self.request_headers = headers
        self.request_url = request_url
        self.request_params = params
        self.response = None

    def set_response(self, response):
        self.response = response

    def get_items(self):
        if not self.response:
            self.response = requests.get(self.request_url,
                headers=self.request_headers,
                params=self.request_params,
            )
        return self.response.json()


atom_api = AtomApi(settings.ATOM_API_TOKEN)
