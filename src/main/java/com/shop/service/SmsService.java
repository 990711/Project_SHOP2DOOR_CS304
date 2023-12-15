package com.shop.service;

import org.springframework.stereotype.Service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

@Service
public class SmsService {

	String ACCOUNT_SID = "ACd4a294afffc176dd796e2812a993409b";

	String AUTH_TOKEN = "";

//	String OUTGOING_SMS_NUMBER ="+18168734493";

	public void setup() {
		Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
	}

	public void sendSMS(String smsNumber, String smsMessage) {
		setup();
		Message message = Message
				.creator(new com.twilio.type.PhoneNumber("whatsapp:" + smsNumber),
						new com.twilio.type.PhoneNumber("whatsapp:+14155238886"), smsMessage)

				.create();

	}
}