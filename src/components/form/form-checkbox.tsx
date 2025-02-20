import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

const FormCheckboxGroup = ({ label, options, name }: { label: string; options: readonly { id: string; label: string }[]; name: string; }) => (
  <FormField
    name={name}
    render={() => (
      <FormItem>
        <div className="mb-4">
          <FormLabel className="text-base">{label}</FormLabel>
        </div>
        {options.map((item) => (
          <FormField
            key={item.id}
            name={name}
            render={({ field }) => (
              <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value?.includes(item.id)}
                    onCheckedChange={(checked) =>
                      checked
                        ? field.onChange([...field.value, item.id])
                        : field.onChange(field.value?.filter((value: string) => value !== item.id))
                    }
                  />
                </FormControl>
                <FormLabel className="font-normal">{item.label}</FormLabel>
              </FormItem>
            )}
          />
        ))}
        <FormMessage />
      </FormItem>
    )}
  />
);

export default FormCheckboxGroup