from selenium.webdriver.common.by import By

def type_letters(driver, input):
  for i in input:
      driver.find_element(By.ID, f"key-{i}").click()

def reset_board(driver):
  # click delete 5 times
  for i in range(0, 5):
    driver.find_element(By.ID, "key-delete").click()