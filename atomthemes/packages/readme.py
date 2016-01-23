from markdown import markdown
import re


class ReadmeReader:
    def __init__(self, text):
        self.image_pattern = re.compile(r'src="([^"]+)"', re.M)
        self.html = markdown(text)

    def get_images(self):
        return self.image_pattern.findall(self.html)

    def get_screenshot(self):
        stopwords = ['.svg', '.gif']
        for image_url in self.get_images():
            if any((w in image_url for w in stopwords)):
                continue
            return image_url
