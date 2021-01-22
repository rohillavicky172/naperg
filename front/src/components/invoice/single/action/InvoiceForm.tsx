import React from 'react'
import { Invoice } from '../../Invoice.type'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'

import DateFnsUtils from '@date-io/date-fns'
import { DateTimePicker } from '@material-ui/pickers'

type Props = {
  invoice: Invoice
  onChangeInvoice: (invoice: Invoice) => void
}

const InvoiceForm = (props: Props) => {
  return (
    <>
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DateTimePicker
            className=""
            id={'endDate'}
            autoOk
            label={'dateInvoice'}
            value={props.invoice.dateInvoice}
            onChange={(dateInvoice: Date) =>
              props.onChangeInvoice({
                ...props.invoice,
                dateInvoice,
              })
            }
          />
        </MuiPickersUtilsProvider>
      </div>
      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="Status">{`Status`}</InputLabel>
          <Select
            value={props.invoice.status}
            onChange={(e: any) =>
              props.onChangeInvoice({
                ...props.invoice,
                status: e.target.value,
              })
            }>
            <MenuItem value="SUCCESSFUL">SUCCESSFUL</MenuItem>
            <MenuItem value="PENDING">PENDING</MenuItem>
            <MenuItem value="ERROR">ERROR</MenuItem>
            <MenuItem value="ERROR_PAYMENT">ERROR_PAYMENT</MenuItem>
            <MenuItem value="DUE">DUE</MenuItem>
            <MenuItem value="PAID">PAID</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="statusIssuing">{`statusIssuing`}</InputLabel>
          <Select
            value={props.invoice.statusIssuing}
            onChange={(e: any) =>
              props.onChangeInvoice({
                ...props.invoice,
                statusIssuing: e.target.value,
              })
            }>
            <MenuItem value="pending">pending</MenuItem>
            <MenuItem value="closed">closed</MenuItem>
            <MenuItem value="reversed">reversed</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="type">{`type`}</InputLabel>
          <Select
            value={props.invoice.type}
            onChange={(e: any) =>
              props.onChangeInvoice({
                ...props.invoice,
                type: e.target.value,
              })
            }>
            <MenuItem value="TOP_UP">TOP_UP</MenuItem>
            <MenuItem value="AUTO_TOP_UP">AUTO_TOP_UP</MenuItem>
            <MenuItem value="VIRTUAL_CARD">VIRTUAL_CARD</MenuItem>
            <MenuItem value="REFUND">REFUND</MenuItem>
            <MenuItem value="REFUND_CASH_OUT">REFUND_CASH_OUT</MenuItem>
            <MenuItem value="PLATFORM_FEES">PLATFORM_FEES</MenuItem>
            <MenuItem value="PHYSICAL_CARD_FEES">PHYSICAL_CARD_FEES</MenuItem>
            <MenuItem value="SELLER_REVSHARE">SELLER_REVSHARE</MenuItem>
            <MenuItem value="RECURING_PLATFORM_FEES">RECURING_PLATFORM_FEES</MenuItem>
            <MenuItem value="RECURING_PLATFORM_FEES_TRIAL">RECURING_PLATFORM_FEES_TRIAL</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="typePayment">{`typePayment`}</InputLabel>
          <Select
            value={props.invoice.typePayment}
            onChange={(e: any) =>
              props.onChangeInvoice({
                ...props.invoice,
                typePayment: e.target.value,
              })
            }>
            <MenuItem value="BALANCE">BALANCE</MenuItem>
            <MenuItem value="PAYMENT_SOURCE">PAYMENT_SOURCE</MenuItem>
            <MenuItem value="WIRE_TRANSFER">WIRE_TRANSFER</MenuItem>
            <MenuItem value="PAYMENT_SOURCE_SMALL_EXPENSE">PAYMENT_SOURCE_SMALL_EXPENSE</MenuItem>
            <MenuItem value="REWARD">REWARD</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="currency">{`currency`}</InputLabel>
          <Input
            id="currency"
            type="text"
            onChange={(e: any) =>
              props.onChangeInvoice({
                ...props.invoice,
                currency: e.target.value,
              })
            }
            value={props.invoice.currency}
          />
        </FormControl>
      </div>
      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="period">{`period`}</InputLabel>
          <Input
            id="period"
            type="text"
            onChange={(e: any) =>
              props.onChangeInvoice({
                ...props.invoice,
                period: e.target.value,
              })
            }
            value={props.invoice.period}
          />
        </FormControl>
      </div>
      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="customSourceLabel">{`customSourceLabel`}</InputLabel>
          <Input
            id="customSourceLabel"
            type="text"
            onChange={(e: any) =>
              props.onChangeInvoice({
                ...props.invoice,
                customSourceLabel: e.target.value,
              })
            }
            value={props.invoice.customSourceLabel}
          />
        </FormControl>
      </div>
      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="customSourceLabelPrivate">{`customSourceLabelPrivate`}</InputLabel>
          <Input
            id="customSourceLabelPrivate"
            type="text"
            onChange={(e: any) =>
              props.onChangeInvoice({
                ...props.invoice,
                customSourceLabelPrivate: e.target.value,
              })
            }
            value={props.invoice.customSourceLabelPrivate}
          />
        </FormControl>
      </div>
      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="description">{`description`}</InputLabel>
          <Input
            id="description"
            type="text"
            onChange={(e: any) =>
              props.onChangeInvoice({
                ...props.invoice,
                description: e.target.value,
              })
            }
            value={props.invoice.description}
          />
        </FormControl>
      </div>
      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="smallId">{`smallId (12 digits)`}</InputLabel>
          <Input
            id="smallId"
            type="number"
            onChange={(e: any) =>
              props.onChangeInvoice({
                ...props.invoice,
                smallId: e.target.value,
              })
            }
            value={props.invoice.smallId}
          />
        </FormControl>
      </div>
      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="productCostLocal">{`productCostLocal`}</InputLabel>
          <Input
            id="productCostLocal"
            type="number"
            onChange={(e: any) =>
              props.onChangeInvoice({
                ...props.invoice,
                productCostLocal: e.target.value,
              })
            }
            value={props.invoice.productCostLocal}
          />
        </FormControl>
      </div>
      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="productCostLocalInitial">{`productCostLocalInitial`}</InputLabel>
          <Input
            id="productCostLocalInitial"
            type="number"
            onChange={(e: any) =>
              props.onChangeInvoice({
                ...props.invoice,
                productCostLocalInitial: e.target.value,
              })
            }
            value={props.invoice.productCostLocalInitial}
          />
        </FormControl>
      </div>
      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="availableAmountToRefund">{`availableAmountToRefund`}</InputLabel>
          <Input
            id="availableAmountToRefund"
            type="number"
            onChange={(e: any) =>
              props.onChangeInvoice({
                ...props.invoice,
                availableAmountToRefund: e.target.value,
              })
            }
            value={props.invoice.availableAmountToRefund}
          />
        </FormControl>
      </div>
      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="productCost">{`productCost`}</InputLabel>
          <Input
            id="productCost"
            type="number"
            onChange={(e: any) =>
              props.onChangeInvoice({
                ...props.invoice,
                productCost: e.target.value,
              })
            }
            value={props.invoice.productCost}
          />
        </FormControl>
      </div>
      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="productCostInitial">{`productCostInitial`}</InputLabel>
          <Input
            id="productCostInitial"
            type="number"
            onChange={(e: any) =>
              props.onChangeInvoice({
                ...props.invoice,
                productCostInitial: e.target.value,
              })
            }
            value={props.invoice.productCostInitial}
          />
        </FormControl>
      </div>
      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="buyerFinalPrice">{`buyerFinalPrice`}</InputLabel>
          <Input
            id="buyerFinalPrice"
            type="number"
            onChange={(e: any) =>
              props.onChangeInvoice({
                ...props.invoice,
                buyerFinalPrice: e.target.value,
              })
            }
            value={props.invoice.buyerFinalPrice}
          />
        </FormControl>
      </div>
      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="authorization_stripe_id">{`authorization_stripe_id`}</InputLabel>
          <Input
            id="authorization_stripe_id"
            type="text"
            onChange={(e: any) =>
              props.onChangeInvoice({
                ...props.invoice,
                authorization_stripe_id: e.target.value,
              })
            }
            value={props.invoice.authorization_stripe_id}
          />
        </FormControl>
      </div>
      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="snapshotValueBalance">{`snapshotValueBalance`}</InputLabel>
          <Input
            id="snapshotValueBalance"
            type="number"
            onChange={(e: any) =>
              props.onChangeInvoice({
                ...props.invoice,
                snapshotValueBalance: e.target.value,
              })
            }
            value={props.invoice.snapshotValueBalance}
          />
        </FormControl>
      </div>
      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="foreignExchangeFee">{`foreignExchangeFee`}</InputLabel>
          <Input
            id="foreignExchangeFee"
            type="number"
            onChange={(e: any) =>
              props.onChangeInvoice({
                ...props.invoice,
                foreignExchangeFee: e.target.value,
              })
            }
            value={props.invoice.foreignExchangeFee}
          />
        </FormControl>
      </div>
      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="incomingPaymentFee">{`incomingPaymentFee`}</InputLabel>
          <Input
            id="incomingPaymentFee"
            type="number"
            onChange={(e: any) =>
              props.onChangeInvoice({
                ...props.invoice,
                incomingPaymentFee: e.target.value,
              })
            }
            value={props.invoice.incomingPaymentFee}
          />
        </FormControl>
      </div>
      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="crossBorderFee">{`crossBorderFee`}</InputLabel>
          <Input
            id="crossBorderFee"
            type="number"
            onChange={(e: any) =>
              props.onChangeInvoice({
                ...props.invoice,
                crossBorderFee: e.target.value,
              })
            }
            value={props.invoice.crossBorderFee}
          />
        </FormControl>
      </div>
      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="cashback">{`Cashback`}</InputLabel>
          <Input
            id="cashback"
            type="number"
            onChange={(e: any) =>
              props.onChangeInvoice({
                ...props.invoice,
                cashback: e.target.value,
              })
            }
            value={props.invoice.cashback}
          />
        </FormControl>
      </div>
      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="revshare">{`revshare`}</InputLabel>
          <Input
            id="revshare"
            type="number"
            onChange={(e: any) =>
              props.onChangeInvoice({
                ...props.invoice,
                revshare: e.target.value,
              })
            }
            value={props.invoice.revshare}
          />
        </FormControl>
      </div>
    </>
  )
}

export default InvoiceForm
