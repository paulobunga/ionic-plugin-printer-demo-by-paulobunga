import { Component } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { Printer } from 'ionic-plugin-printer-by-paulobunga';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class HomePage {
  constructor(private alertController: AlertController) {}

  async print() {
    try {
      await Printer.requestPermissions();

      // Get the list of connected devices (printers)
      const { devices } = await Printer.getConnectedDevices();

      // Assuming you have at least one connected printer, select the first one
      if (devices.length > 0) {
        const selectedDevice = devices[0];

        // Connect to the selected printer
        await Printer.connectToDevice({
          device_name: selectedDevice.device_name,
        });

        // Print "Hello, World!"
        await Printer.print({ content: 'Hello, World!' });

        // Disconnect from the printer when done
        await Printer.disconnect();
      } else {
        console.error('No connected printers found.');
        // Show an alert if no printers are found
        this.showAlert(
          'No Printers Found',
          'Please connect a printer and try again.'
        );
      }
    } catch (error) {
      console.error('Printing error:', error);
      // Show an alert for any printing errors
      this.showAlert('Printing Error', 'An error occurred while printing.');
    }
  }

  async showAlert(title: string, errorMessage: string) {
    const alert = await this.alertController.create({
      header: title,
      message: errorMessage,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
