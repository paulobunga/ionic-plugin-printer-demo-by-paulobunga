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
        await Printer.print({
          content: {
            orderNum: '0001',
            total: '26.4',
            type: 'Sur place',
            paiementType: 'Cash',
            notes: "pas d'olive",
            company: 'Paris 5',
            address: '1 rue de bearn 57070 Metz',
            tel: '0650445371',
            date: '19/09/2023',
            hour: '12:07',
            items: [
              {
                title: 'Cheese',
                price: '9.5',
                quantity: '1',
                combinations: [
                  {
                    title: 'viande',
                    choice: ['tenders', 'merguez', 'nuggets'],
                  },
                  {
                    title: 'Sauces',
                    choice: ['Andalouse', 'Ketchup'],
                  },
                ],
              },
              {
                title: 'Hamburger',
                price: '9.4',
                quantity: '1',
                combinations: [
                  {
                    title: 'viande',
                    choice: ['tenders'],
                  },
                  {
                    title: 'sauces',
                    choice: ['harissa', 'moutarde', 'samourai'],
                  },
                ],
              },
              {
                title: 'Brochette de poulet',
                price: '7.5',
                quantity: '1',
                combinations: [
                  {
                    title: 'sauces',
                    choice: ['mayonnaise'],
                  },
                  {
                    title: 'viande',
                    choice: ['cordon bleu'],
                  },
                ],
              },
            ],
          },
        });

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
