// PaymentProcessor.java
package com.paymentprocessor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PaymentProcessor {
    public static void main(String[] args) {
        SpringApplication.run(PaymentProcessor.class, args);
    }
}
```

```java
// PaymentGateway.java
package com.paymentprocessor.gateway;

import org.springframework.stereotype.Component;

@Component
public abstract class PaymentGateway {
    protected abstract String getName();

    protected abstract boolean processPayment(String paymentInfo);
}
```

```java
// PayPalGateway.java
package com.paymentprocessor.gateway;

import org.springframework.stereotype.Component;

@Component
public class PayPalGateway extends PaymentGateway {
    @Override
    protected String getName() {
        return "PayPal";
    }

    @Override
    protected boolean processPayment(String paymentInfo) {
        // Implement PayPal payment processing logic
        return true;
    }
}
```

```java
// StripeGateway.java
package com.paymentprocessor.gateway;

import org.springframework.stereotype.Component;

@Component
public class StripeGateway extends PaymentGateway {
    @Override
    protected String getName() {
        return "Stripe";
    }

    @Override
    protected boolean processPayment(String paymentInfo) {
        // Implement Stripe payment processing logic
        return true;
    }
}
```

```java
// AuthorizeNetGateway.java
package com.paymentprocessor.gateway;

import org.springframework.stereotype.Component;

@Component
public class AuthorizeNetGateway extends PaymentGateway {
    @Override
    protected String getName() {
        return "Authorize.net";
    }

    @Override
    protected boolean processPayment(String paymentInfo) {
        // Implement Authorize.net payment processing logic
        return true;
    }
}
```

```java
// PaymentProcessorConfig.java
package com.paymentprocessor.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.paymentprocessor.gateway.PayPalGateway;
import com.paymentprocessor.gateway.StripeGateway;
import com.paymentprocessor.gateway.AuthorizeNetGateway;

@Configuration
public class PaymentProcessorConfig {
    @Bean
    public PayPalGateway payPalGateway() {
        return new PayPalGateway();
    }

    @Bean
    public StripeGateway stripeGateway() {
        return new StripeGateway();
    }

    @Bean
    public AuthorizeNetGateway authorizeNetGateway() {
        return new AuthorizeNetGateway();
    }
}
```

```java
// PaymentProcessorService.java
package com.paymentprocessor.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.paymentprocessor.gateway.PaymentGateway;

@Service
public class PaymentProcessorService {
    private final PaymentGateway paymentGateway;

    @Autowired
    public PaymentProcessorService(PaymentGateway paymentGateway) {
        this.paymentGateway = paymentGateway;
    }

    public boolean processPayment(String paymentInfo) {
        return paymentGateway.processPayment(paymentInfo);
    }
}
```

```java
// PaymentProcessorController.java
package com.paymentprocessor.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.paymentprocessor.service.PaymentProcessorService;

@RestController
public class PaymentProcessorController {
    private final PaymentProcessorService paymentProcessorService;

    @Autowired
    public PaymentProcessorController(PaymentProcessorService paymentProcessorService) {
        this.paymentProcessorService = paymentProcessorService;
    }

    @PostMapping("/process-payment")
    public boolean processPayment(@RequestBody String paymentInfo) {
        return paymentProcessorService.processPayment(paymentInfo);
    }
}
```

```java
// PaymentProcessorApplication.java
package com.paymentprocessor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PaymentProcessorApplication {
    public static void main(String[] args) {
        SpringApplication.run(PaymentProcessorApplication.class, args);
    }
}
```

```properties
# application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/paymentprocessor
spring.datasource.username=root
spring.datasource.password=password
spring.jpa.hibernate.ddl-auto=update
```

```java
// PaymentProcessorApplicationTests.java
package com.paymentprocessor;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.paymentprocessor.controller.PaymentProcessorController;
import com.paymentprocessor.service.PaymentProcessorService;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PaymentProcessorApplicationTests {
    @Autowired
    private PaymentProcessorService paymentProcessorService;

    @Autowired
    private PaymentProcessorController paymentProcessorController;

    @Test
    public void testProcessPayment() {
        String paymentInfo = "{\"amount\": 10.99, \"currency\": \"USD\"}";
        boolean result = paymentProcessorService.processPayment(paymentInfo);
        System.out.println(result);
    }
}