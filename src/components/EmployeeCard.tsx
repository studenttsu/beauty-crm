interface EmployeeCardProps {
    fullName: string;
    photo?: string;
    onClick: () => void;
}
  
export function EmployeeCard({ fullName, onClick, photo }: EmployeeCardProps) {
    return (
        <div className="employee">
            {photo && <img src={photo} width={200} alt="" />}
            <p>{fullName}</p>
            <button onClick={onClick}>Remove</button>
        </div>
    );
}