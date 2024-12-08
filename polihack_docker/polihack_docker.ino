#include <DHT.h>

// Pinuri
#define DHTPIN 2        // Pinul conectat la DHT11
#define DHTTYPE DHT11   // Tipul senzorului DHT11
#define FIRE_SENSOR_PIN A0  // Pinul analogic pentru senzorul de foc
#define LDR_PIN A1          // Pinul analogic pentru fotorezistor
#define MQ2_PIN A2          // Pinul analogic pentru senzorul MQ2

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();

  // Configurare pinuri
  pinMode(FIRE_SENSOR_PIN, INPUT);
  pinMode(LDR_PIN, INPUT);
  pinMode(MQ2_PIN, INPUT);

  //Serial.println("Sistemul a pornit. Citirea datelor...");
}

void loop() {
  // Citirea temperaturii și umidității de la DHT11
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();

  // Verificăm dacă citirea a fost corectă
  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Eroare la citirea de la senzorul DHT11!");
  } else {
    //Serial.print("Temperatura: ");
    Serial.print("T: ");
    Serial.println(temperature);
    //Serial.println(" °C");
    
    //Serial.print("Umiditate: ");
    Serial.print("H: ");
    Serial.println(humidity);
    //Serial.println(" %");
  }

  // Citirea valorii senzorului de foc
  int fireValue = analogRead(FIRE_SENSOR_PIN);
  //Serial.print("Valoare senzor foc: ");
  Serial.print("F: ");
  Serial.println(fireValue);

  // Citirea intensității luminoase de la fotorezistor
  int lightIntensity = analogRead(LDR_PIN);
  //Serial.print("Intensitate luminoasă: ");
  Serial.print("L: ");
  Serial.println(lightIntensity);

  // Citirea valorii de la senzorul MQ2
  int mq2Value = analogRead(MQ2_PIN);
  //Serial.print("Valoare MQ2 (calitate aer): ");
  Serial.print("C: ");
  Serial.println(mq2Value);

  // Interpretare simplă pentru calitatea aerului
  /*
  if (mq2Value > 300) { // Prag orientativ, ajustabil în funcție de aplicație
    Serial.println("Atenție! Niveluri ridicate de gaze detectate!");
  } else {
    Serial.println("Calitatea aerului este bună.");
  }
  */

  // Pauză între citiri
  delay(2000); // 2 secunde
}