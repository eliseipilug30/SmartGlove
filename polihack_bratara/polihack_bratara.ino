#include <DHT.h>

// Configurare DHT11
#define DHTPIN 2     // Pinul digital pentru DHT11 (D2)
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// Configurare buzzer
#define BUZZER_PIN 3 // Pinul pentru buzzer (D3)

// Configurare senzor puls
#define samp_siz 4       // Dimensiunea ferestrei pentru media mobilă
#define rise_threshold 4 // Prag pentru detectarea creșterii (puls)

int sensorPin = A0; // Pin analogic pentru senzorul de puls (A0)

// Variabile pentru monitorizarea pulsului
float reads[samp_siz], sum = 0;
float last = 0, before = 0, print_value = 0;
bool rising = false;
int rise_count = 0;
float first = 0, second = 0, third = 0;
long int last_beat = 0, ptr = 0;

// Variabile pentru temperatura și buzzer
unsigned long lastTempCheck = 0; // Ultimul moment când temperatura a fost verificată
const unsigned long tempInterval = 1000; // Intervalul pentru verificarea temperaturii (1 secundă)

void setup() {
    Serial.begin(9600); // Inițializează comunicarea Serial la 9600 baud (Bluetooth)
    dht.begin();
    pinMode(BUZZER_PIN, OUTPUT);
    digitalWrite(BUZZER_PIN, LOW);

    // Inițializare array pentru citiri
    for (int i = 0; i < samp_siz; i++) {
        reads[i] = 0;
    }

}

void loop() {
    // Logica pentru monitorizarea pulsului
    int n = 0;
    long start = millis();
    float reader = 0.;

    // Media citirilor analogice pe o perioadă de 20ms pentru reducerea zgomotului
    do {
        reader += analogRead(sensorPin);
        n++;
    } while (millis() < start + 20);
    reader /= n;

    // Actualizare a mediei mobile
    sum -= reads[ptr];
    sum += reader;
    reads[ptr] = reader;
    last = sum / samp_siz;

    // Detectarea unei creșteri a semnalului (bătăi inimă)
    if (last > before) {
        rise_count++;
        if (!rising && rise_count > rise_threshold) {
            rising = true;
            first = millis() - last_beat;
            last_beat = millis();

            // Calcularea mediei ponderate pentru ritmul cardiac
            print_value = 60000. / (0.4 * first + 0.3 * second + 0.3 * third);

            // Afișare ritm cardiac în Serial și prin Bluetooth
            String heartRateMessage = "R:" + String(print_value);
            Serial.println(heartRateMessage);
            Serial.println();

            // Trimitere către Bluetooth
            Serial.println(heartRateMessage); 

            // Actualizare valori pentru media ponderată
            third = second;
            second = first;
        }
    } else {
        rising = false;
        rise_count = 0;
    }
    before = last;

    // Incrementare pointer pentru citiri
    ptr++;
    ptr %= samp_siz;

    // Verificare periodică a temperaturii
    if (millis() - lastTempCheck >= tempInterval) {
        lastTempCheck = millis(); // Actualizare timp verificare

        // Citire temperatură
        float temp = dht.readTemperature();

        if (isnan(temp)) {
        } else {
            String tempMessage = "T:" + String(temp);
            Serial.println(tempMessage); // Trimitere temperatură prin Bluetooth

            // Activare buzzer dacă temperatura depășește 38°C
            if (temp > 38.0) {
                digitalWrite(BUZZER_PIN, HIGH);
            } else {
                digitalWrite(BUZZER_PIN, LOW);
            }

            // Trimitere către Bluetooth
            Serial.println(tempMessage);
        }
    }
}