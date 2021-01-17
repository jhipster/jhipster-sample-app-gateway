package io.github.jhipster.sample.gateway.responserewriting;

import static io.github.jhipster.sample.gateway.responserewriting.SwaggerBasePathRewritingFilter.gzipData;
import static org.junit.jupiter.api.Assertions.*;

import com.netflix.zuul.context.RequestContext;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.zip.GZIPInputStream;
import org.apache.commons.io.IOUtils;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

/**
 * Tests {@link SwaggerBasePathRewritingFilter} class.
 */
class SwaggerBasePathRewritingFilterTest {

    private SwaggerBasePathRewritingFilter filter = new SwaggerBasePathRewritingFilter();

    @Test
    void shouldFilter_on_default_swagger_url() {
        MockHttpServletRequest request = new MockHttpServletRequest("GET", "/v3/api-docs");
        RequestContext.getCurrentContext().setRequest(request);

        assertTrue(filter.shouldFilter());
    }

    /**
     * Zuul DebugFilter can be triggered by "deug" parameter.
     */
    @Test
    void shouldFilter_on_default_swagger_url_with_param() {
        MockHttpServletRequest request = new MockHttpServletRequest("GET", "/v3/api-docs");
        request.setParameter("debug", "true");
        RequestContext.getCurrentContext().setRequest(request);

        assertTrue(filter.shouldFilter());
    }

    @Test
    void shouldNotFilter_on_wrong_url() {
        MockHttpServletRequest request = new MockHttpServletRequest("GET", "/management/info");
        RequestContext.getCurrentContext().setRequest(request);

        assertFalse(filter.shouldFilter());
    }

    @Test
    void run_on_valid_response() throws Exception {
        MockHttpServletRequest request = new MockHttpServletRequest("GET", "/services/service1/v3/api-docs");
        RequestContext context = RequestContext.getCurrentContext();
        context.setRequest(request);

        MockHttpServletResponse response = new MockHttpServletResponse();
        context.setResponseGZipped(false);
        context.setResponse(response);

        InputStream in = IOUtils.toInputStream("{\"servers\":[{\"url\":\"http://localhost:8080\"}]}", StandardCharsets.UTF_8);
        context.setResponseDataStream(in);

        filter.run();

        assertEquals("UTF-8", response.getCharacterEncoding());
        assertEquals("{\"servers\":[{\"url\":\"http://localhost:8080/services/service1\"}]}", context.getResponseBody());
    }

    @Test
    void run_on_valid_response_gzip() throws Exception {
        MockHttpServletRequest request = new MockHttpServletRequest("GET", "/services/service1/v3/api-docs");
        RequestContext context = RequestContext.getCurrentContext();
        context.setRequest(request);

        MockHttpServletResponse response = new MockHttpServletResponse();
        context.setResponseGZipped(true);
        context.setResponse(response);

        context.setResponseDataStream(new ByteArrayInputStream(gzipData("{\"servers\":[{\"url\":\"http://localhost:8080\"}]}")));

        filter.run();

        assertEquals("UTF-8", response.getCharacterEncoding());

        InputStream responseDataStream = new GZIPInputStream(context.getResponseDataStream());
        String responseBody = IOUtils.toString(responseDataStream, StandardCharsets.UTF_8);
        assertEquals("{\"servers\":[{\"url\":\"http://localhost:8080/services/service1\"}]}", responseBody);
    }

    @Test
    void run_on_empty() throws Exception {
        MockHttpServletRequest request = new MockHttpServletRequest("GET", "/services/service1/v3/api-docs");
        RequestContext context = RequestContext.getCurrentContext();
        context.setRequest(request);

        MockHttpServletResponse response = new MockHttpServletResponse();
        context.setResponseGZipped(true);
        context.setResponse(response);

        context.setResponseDataStream(new ByteArrayInputStream(gzipData("{}")));

        filter.run();

        assertEquals("UTF-8", response.getCharacterEncoding());

        InputStream responseDataStream = new GZIPInputStream(context.getResponseDataStream());
        String responseBody = IOUtils.toString(responseDataStream, StandardCharsets.UTF_8);
        assertEquals("{}", responseBody);
    }

    @Test
    void run_on_empty_servers() throws Exception {
        MockHttpServletRequest request = new MockHttpServletRequest("GET", "/services/service1/v3/api-docs");
        RequestContext context = RequestContext.getCurrentContext();
        context.setRequest(request);

        MockHttpServletResponse response = new MockHttpServletResponse();
        context.setResponseGZipped(true);
        context.setResponse(response);

        context.setResponseDataStream(new ByteArrayInputStream(gzipData("{\"servers\":[]}")));

        filter.run();

        assertEquals("UTF-8", response.getCharacterEncoding());

        InputStream responseDataStream = new GZIPInputStream(context.getResponseDataStream());
        String responseBody = IOUtils.toString(responseDataStream, StandardCharsets.UTF_8);
        assertEquals("{\"servers\":[]}", responseBody);
    }

    @Test
    void run_on_empty_urls() throws Exception {
        MockHttpServletRequest request = new MockHttpServletRequest("GET", "/services/service1/v3/api-docs");
        RequestContext context = RequestContext.getCurrentContext();
        context.setRequest(request);

        MockHttpServletResponse response = new MockHttpServletResponse();
        context.setResponseGZipped(true);
        context.setResponse(response);

        context.setResponseDataStream(new ByteArrayInputStream(gzipData("{\"servers\":[{\"description\":\"description without urls\"}]}")));

        filter.run();

        assertEquals("UTF-8", response.getCharacterEncoding());

        InputStream responseDataStream = new GZIPInputStream(context.getResponseDataStream());
        String responseBody = IOUtils.toString(responseDataStream, StandardCharsets.UTF_8);
        assertEquals("{\"servers\":[{\"description\":\"description without urls\"}]}", responseBody);
    }

    @Test
    void run_on_bad_response() throws Exception {
        MockHttpServletRequest request = new MockHttpServletRequest("GET", "/services/service1/v3/api-docs");
        RequestContext context = RequestContext.getCurrentContext();
        context.setRequest(request);

        MockHttpServletResponse response = new MockHttpServletResponse();
        context.setResponseGZipped(true);
        context.setResponse(response);

        context.setResponseDataStream(new ByteArrayInputStream(gzipData("bad response")));

        filter.run();

        assertEquals("UTF-8", response.getCharacterEncoding());

        InputStream responseDataStream = new GZIPInputStream(context.getResponseDataStream());
        String responseBody = IOUtils.toString(responseDataStream, StandardCharsets.UTF_8);
        assertEquals(responseBody, "null");
    }
}
