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
import { authenticate } from "~/shopify.server";

export async function loader({ request }) {
  const { admin } = await authenticate.admin(request);

  const response = await admin.graphql(`
    query CustomerList {
      customers(first: 50) {
        nodes {
          id
          firstName
          lastName
        }
      }
    }
  `);

  const data = await response.json();

  console.log("Customer data (server):", data);

  return json(data.data.customers.nodes);
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