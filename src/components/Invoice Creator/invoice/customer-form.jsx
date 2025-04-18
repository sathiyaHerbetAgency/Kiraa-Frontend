import { Input } from "@/components/ui/input";

export function CustomerForm({ customers, customer, onChange }) {
  const handleSelect = (e) => {
    e.preventDefault()
    const selectedName = e.target.value;
    // Find the selected customer object in the list by name
    const selectedCustomer = customers?.find(
      (cust) => cust.client_name === selectedName
    );
    console.log(selectedCustomer)
    // Update the customer state. If not found, set default values.
    onChange(
      selectedCustomer || { client_name: selectedName, client_email: "", client_address: "" }
    );
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {/* Dropdown for customer name */}
        <select
          value={customer?.client_name || ""}
          onChange={handleSelect}
          className="border p-2 rounded w-full"
        >
          <option value="">Select Customer</option>
          {customers?.map((cust, index) => (
            <option key={index} value={cust.client_name}>
              {cust.client_name}
            </option>
          ))}
        </select>
        {/* Auto-populated, read-only email field */}
        <Input
          value={customer?.client_email || ""}
          readOnly
          placeholder="Email"
        />
        {/* Auto-populated, read-only address field */}
        <Input
          value={customer?.client_address || ""}
          readOnly
          placeholder="Address"
        />
      </div>
    </div>
  );
}
