const { Builder, By, Key, until } = require('selenium-webdriver');

async function loginTest() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('http://localhost:3000/login');
    await driver.findElement(By.name('username')).sendKeys('testUser');
    await driver.findElement(By.name('password')).sendKeys('testPassword');
    await driver.findElement(By.name('loginButton')).click();

    // Espera a que aparezca el campo para el código 2FA
    await driver.wait(until.elementLocated(By.name('2faCode')), 3000);
    await driver.findElement(By.name('2faCode')).sendKeys('123456');
    await driver.findElement(By.name('verifyButton')).click();

    // Verifica si el login fue exitoso
    let successMessage = await driver.findElement(By.id('successMessage')).getText();
    console.log(successMessage === 'Autenticación exitosa' ? 'Test Passed' : 'Test Failed');
  } finally {
    await driver.quit();
  }
}

loginTest();

const { Builder, By, until } = require('selenium-webdriver');

async function loginTest() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('http://localhost:3000/login');

        // Introduce el nombre de usuario
        await driver.findElement(By.name('username')).sendKeys('testUser');

        // Introduce la contraseña
        await driver.findElement(By.name('password')).sendKeys('testPassword');

        // Haz clic en el botón de inicio de sesión
        await driver.findElement(By.name('loginButton')).click();

        // Verifica si se muestra la pantalla de 2FA
        await driver.wait(until.elementLocated(By.name('2faCode')), 3000);
        console.log('Login Test Passed');
    } catch (error) {
        console.log('Login Test Failed', error);
    } finally {
        await driver.quit();
    }
}

loginTest();

async function twoFactorAuthTest() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('http://localhost:3000/login');

        // Introduce el nombre de usuario y la contraseña
        await driver.findElement(By.name('username')).sendKeys('testUser');
        await driver.findElement(By.name('password')).sendKeys('testPassword');
        await driver.findElement(By.name('loginButton')).click();

        // Espera la pantalla de 2FA e introduce el código
        await driver.wait(until.elementLocated(By.name('2faCode')), 3000);
        await driver.findElement(By.name('2faCode')).sendKeys('123456');
        await driver.findElement(By.name('verifyButton')).click();

        // Verifica si se muestra un mensaje de éxito
        let successMessage = await driver.findElement(By.id('successMessage')).getText();
        console.log(successMessage === 'Autenticación exitosa' ? '2FA Test Passed' : '2FA Test Failed');
    } catch (error) {
        console.log('2FA Test Failed', error);
    } finally {
        await driver.quit();
    }
}

twoFactorAuthTest();

async function sessionManagementTest() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('http://localhost:3000/login');

        // Realiza el login y autenticación 2FA
        await driver.findElement(By.name('username')).sendKeys('testUser');
        await driver.findElement(By.name('password')).sendKeys('testPassword');
        await driver.findElement(By.name('loginButton')).click();
        await driver.wait(until.elementLocated(By.name('2faCode')), 3000);
        await driver.findElement(By.name('2faCode')).sendKeys('123456');
        await driver.findElement(By.name('verifyButton')).click();

        // Espera hasta que la sesión expire (simulación de inactividad)
        await driver.sleep(60000);  // Espera 60 segundos o ajusta según la configuración de tu sesión
        await driver.navigate().refresh();

        // Verifica si el usuario es redirigido a la página de login
        let loginPage = await driver.getCurrentUrl();
        console.log(loginPage.includes('login') ? 'Session Management Test Passed' : 'Session Management Test Failed');
    } catch (error) {
        console.log('Session Management Test Failed', error);
    } finally {
        await driver.quit();
    }
}

sessionManagementTest();