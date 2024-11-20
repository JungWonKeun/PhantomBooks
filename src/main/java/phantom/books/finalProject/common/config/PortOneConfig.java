package phantom.books.finalProject.common.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class PortOneConfig {

    @Value("${portone.channelKey}")
    private String channelKey;

    @Value("${portone.storeId}")
    private String storeId;

    public String getChannelKey() {
        return channelKey;
    }

    public String getStoreId() {
        return storeId;
    }
}
