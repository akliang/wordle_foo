import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options as ChromeOptions
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from helpers.utils import type_letters as htype

@pytest.fixture(scope="function")
def driver_init(request):
  service = ChromeService(executable_path=ChromeDriverManager().install())
  options = ChromeOptions()
  options.add_argument("--headless")
  options.add_argument("--remote-debugging-port=9222")
  options.add_argument("--no-sandbox")
  driver = webdriver.Chrome(service=service, options=options)
  driver.get("http://wordle-staging.albertliang.xyz")
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
    htype(self.driver, input)
    assert "Not enough letters" in self.message_box.text

  def test_invalid_input_and_delete_key(self):
    input = ['H', 'E', 'L', 'L', 'L', 'enter']
    htype(self.driver, input)
    assert "Not a valid word" in self.message_box.text
    input = ['delete', 'O', 'enter']
    htype(self.driver, input)
    assert "You win" in self.message_box.text

  def test_win_and_play_again(self):
    input = ['H', 'E', 'L', 'L', 'O', 'enter']
    htype(self.driver, input)
    assert "You win" in self.message_box.text
    self.driver.find_element(By.ID, "play-again").click()
    assert "Welcome to Wordle" in self.message_box.text

  def test_loss_shortcut(self):
    input = ['L', 'L', 'L', 'L', 'L', 'enter']
    htype(self.driver, input)
    assert "Word was " in self.message_box.text

  def test_loss_actual_and_play_again(self):
    input = ['H', 'O', 'U', 'N', 'D', 'enter']
    for n in range(0,7):
      htype(self.driver, input)
    assert "Word was " in self.message_box.text
    self.driver.find_element(By.ID, "play-again").click()
    assert "Welcome to Wordle" in self.message_box.text

  def test_question_modal(self):
    self.driver.find_element(By.ID, "key-question").click()
    question_modal = self.driver.find_element(By.ID, "question-modal")
    assert "How to play" in question_modal.text
    # test closing the question modal
    # TODO

  def test_settings_modal_and_dark_mode(self):
    self.driver.find_element(By.ID, "key-settings").click()
    settings_modal = self.driver.find_element(By.ID, "settings-modal")
    assert settings_modal.is_displayed
    # trigger dark mode
    # TODO
    # test closing the settings modal
    # TODO
    # check dark mode settings
    # TODO
    



