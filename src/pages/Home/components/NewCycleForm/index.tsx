import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { FormContainer, MinutesAmountInput, TaskInput } from './styles'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'o ciclo precisa ser de pelo menos 5 minutos')
    .max(60, 'o clico não deve ser maior que 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function NewCycleForm() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: undefined,
    },
  })

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        type="text"
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle}
        {...register('task')}
      />
      <datalist id="task-suggestions">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={1}
        max={60}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}
