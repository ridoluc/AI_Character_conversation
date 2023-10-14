const fs = require('fs');

class SettingsManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.defaults = {};
  }

  // Load the JSON file with default values
  loadDefaults() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      this.defaults = JSON.parse(data);
      console.log('Defaults loaded successfully.');
    } catch (err) {
      console.error('Error loading defaults:', err.message);
    }
  }

  // Save the current defaults to the JSON file
  saveDefaults() {
    try {
      const data = JSON.stringify(this.defaults, null, 2);
      fs.writeFileSync(this.filePath, data, 'utf8');
      console.log('Defaults saved successfully.');
    } catch (err) {
      console.error('Error saving defaults:', err.message);
    }
  }

  // Get a list of possible options for a variable
  getOptions(variableName) {
    return this.defaults[variableName] || [];
  }

  // Add an option to a variable's list
  addOption(variableName, optionValue) {
    if (!this.defaults[variableName]) {
      this.defaults[variableName] = [];
    }
    this.defaults[variableName].push(optionValue);
  }

    // Modify an a variable
    setOption(variableName, value) {
      if (!this.defaults[variableName]) {
        this.defaults[variableName] = null;
      }
      this.defaults[variableName] = value;
    }
}