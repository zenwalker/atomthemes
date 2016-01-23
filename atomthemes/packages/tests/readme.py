from atomthemes.packages.readme import ReadmeReader
from atomthemes.pep8fix import TestCase

text = """
# Title

![badge 1](http://example.com/image_1.svg)
![badge 2](http://example.com/image_2.svg)

Text
![screenshot](http://example.com/screenshot.jpg)

![footnote image][1]
[1]: http://example.com/footnote.jpg
"""


class TestReadmeReader(TestCase):
    def set_up(self):
        self.reader = ReadmeReader(text)

    def test_get_images(self):
        self.assert_equal(self.reader.get_images(), [
            'http://example.com/image_1.svg',
            'http://example.com/image_2.svg',
            'http://example.com/screenshot.jpg',
            'http://example.com/footnote.jpg',
        ])

    def test_get_screenshot(self):
        self.assert_equal(self.reader.get_screenshot(), 'http://example.com/screenshot.jpg')
