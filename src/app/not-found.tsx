import { StateNotice } from "@/components/system";
import { Field } from "@/components/ui/field";
import { Section } from "@/components/ui/section";
import { ROUTES } from "@/constants";

/**
 * 404 — UX Blueprint R26.2, R47.2.
 *
 * "That the address does not exist, briefly and dryly, with the two most
 * likely destinations." Forbidden: apologising at length, selling, breaking the
 * register, and **an action** (R26.5, R39.4). So there is no `Action` here and
 * no way to add one — `StateNotice` does not accept it.
 */
export default function NotFound() {
  return (
    <Section>
      <Field type="reading">
        <StateNotice
          state="notFound"
          destinations={[
            { href: ROUTES.products, label: "Products" },
            { href: ROUTES.home, label: "Home" },
          ]}
        >
          This address does not exist.
        </StateNotice>
      </Field>
    </Section>
  );
}
