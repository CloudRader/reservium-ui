const testService = {
    id: 1,
    serviceName: "Test Service",
    linkName: "test-service",
    wikiLink: "https://wiki.example.com/test-service",
    contact_mail: "test@example.com",
    public: true
};

export default testService;

export const privateTestService = {
    id: 2,
    serviceName: "Private Test Service",
    linkName: "private-test-service",
    wikiLink: "https://wiki.example.com/private-test-service",
    contact_mail: "private@example.com",
    public: false
};

export const longNameTestService = {
    id: 3,
    serviceName: "Very Long Test Service Name That Might Cause Layout Issues",
    linkName: "long-name-test-service",
    wikiLink: "https://wiki.example.com/long-name-test-service",
    contact_mail: "long@example.com",
    public: true
}; 