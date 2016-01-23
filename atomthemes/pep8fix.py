from inflection import underscore
from unittest import TestCase as BaseTestCase


def pep8_patch(cls, exclude=[]):
    exclude = set(exclude)
    for attr_name in dir(cls):
        if attr_name in exclude or attr_name.startswith('_'):
            continue
        attr_value = getattr(cls, attr_name)
        if hasattr(attr_value, '__call__'):
            setattr(cls, underscore(attr_name), attr_value)


class TestCase(BaseTestCase):
    def setUp(self):
        set_up = getattr(self, 'set_up', None)
        if set_up:
            set_up()

    def tearDown(self):
        tear_down = getattr(self, 'tear_down', None)
        if tear_down:
            tear_down()


pep8_patch(TestCase, exclude=['setUp', 'tearDown'])
