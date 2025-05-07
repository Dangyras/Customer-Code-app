import {
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  BlockStack,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useLoaderData } from "@remix-run/react";

export async function loader() {
  return [{"id": 1, "firstName": "Joe 1", "lastName": "Doe"},{"id": 2, "firstName": "Joe 2", "lastName": "Doe"},{"id": 3, "firstName": "Joe 3", "lastName": "Doe"}];
}

export default function Codes() {
  const customers = useLoaderData();

  return (
    <Page>
      <TitleBar title="Customer List" />
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="300">
              <Text as="h2" variant="headingMd">Customers</Text>
              <List>
                {customers.map((customer) => (
                  <List.Item key={customer.id}>
                    {customer.firstName} {customer.lastName}
                  </List.Item>
                ))}
              </List>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}