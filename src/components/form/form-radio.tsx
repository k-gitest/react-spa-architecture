import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const FormRadioGroup = ({ label, options, name }: { label: string; options: readonly { value: string; label: string }[]; name: string; }) => (
  <FormField
    name={name}
    render={({ field }) => (
      <FormItem className="space-y-3">
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-col space-y-1">
            {options.map((option) => (
              <FormItem key={option.value} className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value={option.value} />
                </FormControl>
                <FormLabel className="font-normal">{option.label}</FormLabel>
              </FormItem>
            ))}
          </RadioGroup>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default FormRadioGroup