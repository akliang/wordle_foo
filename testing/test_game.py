import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options as ChromeOptions
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By

@pytest.fixture(scope="class")
def driver_init(request):
  service = ChromeService(executable_path=ChromeDriverManager().install())
  options = ChromeOptions()
  options.add_argument("--headless")
  options.add_argument("--remote-debugging-port=9222")
  options.add_argument("--no-sandbox")
  driver = webdriver.Chrome(service=service, options=options)
  driver.get("http://wordfoo-staging.albertliang.xyz")
  driver.implicitly_wait(0.5)
  request.cls.driver = driver
  request.cls.message_box = driver.find_element(By.ID, "message-box")
  yield driver
  driver.quit()

@pytest.mark.usefixtures("driver_init")
class BaseTest:
  pass

class TestAll(BaseTest):
  def test_partial_input(self):
    input = ['H', 'E', 'L', 'enter']
    self.type_letters(input)
    assert "Not enough letters" in self.message_box.text
    self.reset_board()

  def test_invalid_input(self):
    input = ['H', 'E', 'L', 'L', 'L', 'enter']
    self.type_letters(input)
    assert "Not a valid word" in self.message_box.text
    self.reset_board()

  def test_win_and_play_again(self):
    input = ['H', 'E', 'L', 'L', 'O', 'enter']
    self.type_letters(input)
    assert "You win" in self.message_box.text
    self.driver.find_element(By.ID, "play-again").click()
    assert "Welcome to Wordfoo" in self.message_box.text

  def test_loss_shortcut(self):
    input = ['L', 'L', 'L', 'L', 'L', 'enter']
    self.type_letters(input)
    assert "Word was " in self.message_box.text

  def test_loss_actual_and_play_again(self):
    input = ['H', 'O', 'U', 'N', 'D', 'enter']
    for n in range(0,7):
      self.type_letters(input)
    assert "Word was " in self.message_box.text
    self.driver.find_element(By.ID, "play-again").click()
    assert "Welcome to Wordfoo" in self.message_box.text

  def test_color_highlighting(self):
    input = ['H', 'O', 'L', 'E', 'S', 'enter']
    self.type_letters(input)
    assert 'bg-green' in self.driver.find_element(By.ID, "grid-0-0").get_attribute("class")
    assert 'bg-yellow' in self.driver.find_element(By.ID, "grid-0-1").get_attribute("class")
    assert 'bg-green' in self.driver.find_element(By.ID, "grid-0-2").get_attribute("class")
    assert 'bg-yellow' in self.driver.find_element(By.ID, "grid-0-3").get_attribute("class")
    assert 'bg-gray' in self.driver.find_element(By.ID, "grid-0-4").get_attribute("class")
    assert 'bg-green' in self.driver.find_element(By.ID, "key-H").get_attribute("class")
    assert 'bg-yellow' in self.driver.find_element(By.ID, "key-O").get_attribute("class")
    assert 'bg-green' in self.driver.find_element(By.ID, "key-L").get_attribute("class")
    assert 'bg-yellow' in self.driver.find_element(By.ID, "key-E").get_attribute("class")
    assert 'bg-gray' in self.driver.find_element(By.ID, "key-S").get_attribute("class")

    input = ['B', 'E', 'N', 'D', 'S', 'enter']
    self.type_letters(input)
    assert 'bg-gray' in self.driver.find_element(By.ID, "grid-1-0").get_attribute("class")
    assert 'bg-green' in self.driver.find_element(By.ID, "grid-1-1").get_attribute("class")
    assert 'bg-gray' in self.driver.find_element(By.ID, "grid-1-2").get_attribute("class")
    assert 'bg-gray' in self.driver.find_element(By.ID, "grid-1-3").get_attribute("class")
    assert 'bg-gray' in self.driver.find_element(By.ID, "grid-1-4").get_attribute("class")
    assert 'bg-gray' in self.driver.find_element(By.ID, "key-B").get_attribute("class")
    assert 'bg-green' in self.driver.find_element(By.ID, "key-E").get_attribute("class")
    assert 'bg-gray' in self.driver.find_element(By.ID, "key-N").get_attribute("class")
    assert 'bg-gray' in self.driver.find_element(By.ID, "key-D").get_attribute("class")
    assert 'bg-gray' in self.driver.find_element(By.ID, "key-S").get_attribute("class")

  def test_question_modal(self):
    # open the question modal
    self.driver.find_element(By.ID, "key-question").click()
    question_modal = self.driver.find_element(By.ID, "question-modal")
    assert "How to play" in question_modal.text
    # closing the question modal
    self.driver.find_element(By.ID, "close-question-modal").click()
    # check the question-modal element does NOT exxist by checking that find_elements (note the plural element"s") is zero
    assert len(self.driver.find_elements(By.ID, "question-modal")) == 0

  def test_settings_modal_and_dark_mode(self):
    self.driver.find_element(By.ID, "key-settings").click()
    settings_modal = self.driver.find_element(By.ID, "settings-modal")
    # vue v-show removes 'display: none' in order to show an element (instead of applying 'display: block')
    # at the moment, that means the style attribute is empty
    assert not settings_modal.get_attribute("style")
    # trigger dark mode
    self.driver.find_element(By.ID, "toggleB").click()
    # test closing the settings modal
    self.driver.find_element(By.ID, "close-settings-modal").click()
    assert "display: none" in settings_modal.get_attribute("style")
    # check dark mode colors
    # (first row)
    assert 'bg-green' in self.driver.find_element(By.ID, "grid-0-0").get_attribute("class")
    assert 'bg-yellow' in self.driver.find_element(By.ID, "grid-0-1").get_attribute("class")
    assert 'bg-green' in self.driver.find_element(By.ID, "grid-0-2").get_attribute("class")
    assert 'bg-yellow' in self.driver.find_element(By.ID, "grid-0-3").get_attribute("class")
    assert 'bg-gray' in self.driver.find_element(By.ID, "grid-0-4").get_attribute("class")
    # (second row)
    assert 'bg-gray' in self.driver.find_element(By.ID, "grid-1-0").get_attribute("class")
    assert 'bg-green' in self.driver.find_element(By.ID, "grid-1-1").get_attribute("class")
    assert 'bg-gray' in self.driver.find_element(By.ID, "grid-1-2").get_attribute("class")
    assert 'bg-gray' in self.driver.find_element(By.ID, "grid-1-3").get_attribute("class")
    assert 'bg-gray' in self.driver.find_element(By.ID, "grid-1-4").get_attribute("class")
    # (keyboard)
    assert 'bg-green' in self.driver.find_element(By.ID, "key-H").get_attribute("class")
    assert 'bg-green' in self.driver.find_element(By.ID, "key-E").get_attribute("class")
    assert 'bg-green' in self.driver.find_element(By.ID, "key-L").get_attribute("class")
    assert 'bg-yellow' in self.driver.find_element(By.ID, "key-O").get_attribute("class")
    assert 'bg-gray' in self.driver.find_element(By.ID, "key-S").get_attribute("class")
    assert 'bg-gray' in self.driver.find_element(By.ID, "key-D").get_attribute("class")
    assert 'bg-gray' in self.driver.find_element(By.ID, "key-B").get_attribute("class")
    assert 'bg-gray' in self.driver.find_element(By.ID, "key-N").get_attribute("class")



  ### HELPER FUNCTIONS ###
  def type_letters(self, input):
    for i in input:
        self.driver.find_element(By.ID, f"key-{i}").click()

  def reset_board(self):
    # click delete 5 times
    for i in range(0, 5):
      self.driver.find_element(By.ID, "key-delete").click()
    



