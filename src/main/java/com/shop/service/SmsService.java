package com.shop.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

@Service
public class SmsService {

	@Value("${TWILIO_ACCOUNT_SID}")
	String ACCOUNT_SID;

	@Value("${TWILIO_AUTH_TOKEN}")
	String AUTH_TOKEN;
	
	@Value("${TWILIO_OUTGOING_SMS_NUMBER}")
	String OUTGOING_SMS_NUMBER;
	
	public void setup() {
		Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
	}
	
	public void sendSMS(String smsNumber, String smsMessage) {
		setup();
		Message message = Message.creator(
				new PhoneNumber(smsNumber),
				new PhoneNumber(OUTGOING_SMS_NUMBER),
				smsMessage
				).create();
	}
}
