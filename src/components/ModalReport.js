import BaseModal from "./BaseModal";
import ModalReportActivity from "./ModalReportActivity";
import ModalReportSummery from "./ModalReportSummery";

function ModalReport({ value, close }) {

    return (
        <BaseModal value={value} close={() => close(false)} title="Report">
            <ModalReportSummery />
            <ModalReportActivity />
        </BaseModal>
    )
}

export default ModalReport