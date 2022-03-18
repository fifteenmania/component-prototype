import AutoIncMap from "../dataStructure/AutoIncMap";
import DataSpec from "../dataStructure/DataSpec";
import NamespacedMap from "../dataStructure/NamespacedMap";
import ComponentMeta from "../meta/ComponentMeta";
import FieldMeta from "../meta/FieldMeta";
import TypeMeta from "../meta/TypeMeta";

class MetaManager {
    fieldMap: NamespacedMap<FieldMeta>
    componentMap: NamespacedMap<ComponentMeta>
    typeMap: AutoIncMap<TypeMeta>

    constructor() {
        this.fieldMap = new NamespacedMap()
        this.componentMap = new NamespacedMap()
        this.typeMap = new AutoIncMap()
    }

    createType(typeMeta: TypeMeta): string {
        const typeId = this.typeMap.addData(typeMeta)
        return typeId;
    }

    createField(namespace: string, fieldName: string, typeId: string): string {
        const field: FieldMeta = {
            name: fieldName,
            typeId: typeId
        }
        const fieldId = this.fieldMap.getData(namespace).addData(field)
        return fieldId
    }

    // return component id
    createComponent(namespace: string, componentName: string): string {
        const component: ComponentMeta = {
            name: componentName,
            fields: []
        }
        const componentId = this.componentMap.getData(namespace).addData(component)
        return componentId
    }

    getComponent(namespace: string, componentId: string): ComponentMeta | undefined {
        const component = this.componentMap.getData(namespace).getData(componentId)
        return component
    }

    addField(namespace: string, componentId: string, fieldId: string, fieldNamespace: string|undefined): boolean {
        const component = this.componentMap.getData(namespace).getData(componentId)
        if (component === undefined) {
            return false
        }
        const field = this.fieldMap.getData(fieldNamespace??namespace).getData(fieldId)
        if (field === undefined) {
            return false
        }
        component.fields.push(field)
        return true
    }

    getTypes(): DataSpec<TypeMeta>[] {
        const types = this.typeMap.getAllData()
        return types
    }

    getComponents(namespace: string): DataSpec<ComponentMeta>[] {
        const components = this.componentMap.getData(namespace).getAllData()
        return components
    }
}

export default MetaManager