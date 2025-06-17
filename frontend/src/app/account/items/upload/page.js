import ItemForm from "@/components/item/ItemForm";

export default function ItemUploadPage() {
  return (
    <div className="surface-section flex-auto">
      <div className="flex flex-column flex-auto">
        <div>
          <div className="text-900 font-medium text-xl mb-3">Profile</div>
          <div className="font-medium mb-4">
            Welcome back, <span className="font-bold">jOHN!</span> 👋
          </div>
          <ItemForm />
        </div>
      </div>
    </div>
  );
}