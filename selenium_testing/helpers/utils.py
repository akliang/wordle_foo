from selenium.webdriver.common.by import By

def type_letters(driver, input):
  for i in input:
      driver.find_element(By.ID, f"key-{i}").click()