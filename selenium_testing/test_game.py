import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options as ChromeOptions
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By

def test_all():
  service = ChromeService(executable_path=ChromeDriverManager().install())
  options = ChromeOptions()
  options.add_argument("--headless")
  driver = webdriver.Chrome(service=service, options=options)

  driver.get("http://wordle-staging.albertliang.xyz")
  driver.implicitly_wait(0.5)

  title = "Wordle"
  assert title in driver.title

  message_box = driver.find_element(By.ID, "message-box")

  # test partial input
  input = ['H', 'E', 'L']
  for i in input:
    driver.find_element(By.ID, f"key-{i}").click()
  driver.find_element(By.ID, "key-enter").click()
  assert "Not enough letters" in message_box.text

  driver.refresh()
  message_box = driver.find_element(By.ID, "message-box")

  # test incorrect word
  input = ['H', 'E', 'L', 'L', 'L']
  for i in input:
    driver.find_element(By.ID, f"key-{i}").click()
  driver.find_element(By.ID, "key-enter").click()
  assert "Not a valid word" in message_box.text

  driver.refresh()
  message_box = driver.find_element(By.ID, "message-box")

  # test a win
  input = ['H', 'E', 'L', 'L', 'O']
  for i in input:
    driver.find_element(By.ID, f"key-{i}").click()
  driver.find_element(By.ID, "key-enter").click()
  assert "You win" in message_box.text

  # test play again button
  driver.find_element(By.ID, "play-again").click()
  assert "Welcome to Wordle" in message_box.text

  # test a loss (backdoor)
  input = ['L', 'L', 'L', 'L', 'L']
  for i in input:
    driver.find_element(By.ID, f"key-{i}").click()
  driver.find_element(By.ID, "key-enter").click()
  assert "Word was" in message_box.text

  driver.refresh()
  message_box = driver.find_element(By.ID, "message-box")

  # test a full loss
  for n in range(0,7):
    input = ['H', 'O', 'U', 'N', 'D']
    for i in input:
      driver.find_element(By.ID, f"key-{i}").click()
    driver.find_element(By.ID, "key-enter").click()
  assert "Word was" in message_box.text

  driver.refresh()
  message_box = driver.find_element(By.ID, "message-box")

  # test delete key
  input = ['H', 'E', 'L', 'L', 'L']
  for i in input:
    driver.find_element(By.ID, f"key-{i}").click()
  driver.find_element(By.ID, "key-delete").click()
  driver.find_element(By.ID, "key-O").click()
  driver.find_element(By.ID, "key-enter").click()
  assert "You win" in message_box.text

  driver.refresh()
  message_box = driver.find_element(By.ID, "message-box")
  
  # test question modal
  driver.find_element(By.ID, "key-question").click()
  question_modal = driver.find_element(By.ID, "question-modal")
  assert "How to play" in question_modal.text
  # test closing the question modal
  # TODO
  driver.refresh()
  message_box = driver.find_element(By.ID, "message-box")
  
  # test settings modal
  driver.find_element(By.ID, "key-settings").click()
  settings_modal = driver.find_element(By.ID, "settings-modal")
  assert settings_modal.is_displayed
  

  # test dark mode

  # test closing the settings modal
  # TODO
  driver.refresh()
  message_box = driver.find_element(By.ID, "message-box")

  driver.quit()

# refactor driver into fixture
# refactor input letters into method fixture
# find a way to refresh message_box